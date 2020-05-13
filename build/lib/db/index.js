"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = void 0;

var _mongodb = require("mongodb");

var connection = null;

const connectDB = async () => {
  if (connection) return connection;
  let client;

  try {
    client = await _mongodb.MongoClient.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    connection = client.db('test');
  } catch (error) {
    console.error('Could not connected to test database', error);
    process.exit(1);
  }

  return connection;
};

exports.connectDB = connectDB;