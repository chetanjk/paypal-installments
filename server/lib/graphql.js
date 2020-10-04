"use strict";

exports.__esModule = true;
exports.graphQLBatch = graphQLBatch;
exports.pruneQuery = pruneQuery;
exports.buildQuery = buildQuery;
exports.graphqlTypes = void 0;

var _typedGraphqlify = require("typed-graphqlify");

var _config = require("../config");

var _util = require("./util");

function graphQLBatch(req, graphQL) {
  let batch = [];
  let accessToken;
  let clientMetadataID = req.get(_config.HTTP_HEADER.CLIENT_METADATA_ID);
  let timer;

  const batchedGraphQL = async ({
    query,
    variables,
    accessToken: callerAccessToken,
    clientMetadataID: callerClientMetadataID
  }) => {
    return await new Promise((resolve, reject) => {
      if (callerAccessToken) {
        if (accessToken && callerAccessToken !== accessToken) {
          throw new Error(`Access token for graphql call already set`);
        }

        accessToken = callerAccessToken;
      }

      if (callerClientMetadataID) {
        if (clientMetadataID && callerClientMetadataID !== clientMetadataID) {
          throw new Error(`Client Metadata id for graphql call already set`);
        }

        clientMetadataID = callerClientMetadataID;
      }

      batch.push({
        query,
        variables,
        resolve,
        reject
      });
      timer = setTimeout(() => {
        batchedGraphQL.flush();
      }, 0);
    });
  };

  batchedGraphQL.flush = async () => {
    clearTimeout(timer);

    if (!batch.length) {
      return;
    }

    const currentBatch = batch;
    batch = [];
    const payload = currentBatch.map(({
      query,
      variables
    }) => {
      return {
        query,
        variables
      };
    });
    let response;
    let gqlError;

    try {
      response = await graphQL(req, payload, {
        accessToken,
        clientMetadataID
      });
    } catch (err) {
      gqlError = err;
    }

    for (let i = 0; i < currentBatch.length; i++) {
      const {
        resolve,
        reject
      } = currentBatch[i];

      if (gqlError) {
        reject(gqlError);
        continue;
      }

      const batchItem = response && response[i];

      if (!batchItem) {
        reject(new Error(`No response from gql`));
        continue;
      }

      const {
        result,
        error
      } = batchItem;

      if (gqlError || error) {
        reject(gqlError || error);
      } else {
        resolve(result);
      }
    }
  };

  return batchedGraphQL;
}

const graphqlTypes = {
  boolean: _typedGraphqlify.types.boolean,
  string: _typedGraphqlify.types.string
};
exports.graphqlTypes = graphqlTypes;

function isGraphQLType(val) {
  for (const type of Object.values(graphqlTypes)) {
    if (val === type) {
      return true;
    }
  }

  return false;
}

function treeShakeQuery(query) {
  const result = {};

  for (const key of Object.keys(query)) {
    const value = query[key];

    if (!(0, _util.isDefined)(value)) {
      continue;
    }

    if (isGraphQLType(value)) {
      result[key] = value;
      continue;
    }

    if (typeof value === 'object' && value !== null) {
      const treeShakedQuery = treeShakeQuery(value);

      if (!(0, _util.isEmpty)(treeShakedQuery)) {
        result[key] = treeShakedQuery;
      }

      continue;
    }

    throw new Error(`Unrecognized type: ${typeof value}`);
  }

  return result;
}

function pruneQuery(query, existingData) {
  const result = {};

  for (const key of Object.keys(query)) {
    const value = query[key]; // $FlowFixMe

    const existingValue = existingData[key];

    if (!(0, _util.isDefined)(existingValue)) {
      result[key] = value;
      continue;
    }

    if (!(0, _util.isDefined)(value) || isGraphQLType(value)) {
      continue;
    }

    if (typeof value === 'object' && value !== null) {
      if (typeof existingValue !== 'object' || existingValue === null) {
        throw new Error(`Expected existing value to be object`);
      }

      result[key] = pruneQuery(value, existingValue);
      continue;
    }

    throw new Error(`Unrecognized type: ${typeof value}`);
  }

  return result;
}

function buildQuery({
  name,
  key,
  inputTypes,
  inputs,
  query
}) {
  const treeShakedQuery = treeShakeQuery(query);

  if ((0, _util.isEmpty)(treeShakedQuery)) {
    return;
  }

  return (0, _typedGraphqlify.query)(name, (0, _typedGraphqlify.params)(inputTypes, {
    [key]: (0, _typedGraphqlify.params)(inputs, treeShakedQuery)
  }));
}