"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

const errorHandler = error => {
  console.error(error);
  throw new Error('Fallo en la operación del servidor');
};

exports.errorHandler = errorHandler;