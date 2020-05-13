"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _mutations = _interopRequireDefault(require("./mutations"));

var _queries = _interopRequireDefault(require("./queries"));

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = {
  Query: _queries.default,
  Mutation: _mutations.default,
  ..._types.default
};
exports.resolvers = resolvers;