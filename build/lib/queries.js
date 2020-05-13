"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = require("./db");

var _mongodb = require("mongodb");

var _errorHandler = require("./errorHandler");

var _default = {
  getCourses: async () => {
    let db,
        courses = [];

    try {
      db = await (0, _db.connectDB)();
      courses = await db.collection('courses').find().toArray();
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return courses;
  },
  getCourse: async (root, {
    id
  }) => {
    let db,
        course = {};

    try {
      db = await (0, _db.connectDB)();
      course = await db.collection('courses').findOne({
        _id: (0, _mongodb.ObjectID)(id)
      });
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return course;
  },
  getPeople: async () => {
    let db,
        students = [];

    try {
      db = await (0, _db.connectDB)();
      students = await db.collection('students').find().toArray();
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return students;
  },
  getPerson: async (root, {
    id
  }) => {
    let db,
        student = {};

    try {
      db = await (0, _db.connectDB)();
      student = await db.collection('students').findOne({
        _id: (0, _mongodb.ObjectID)(id)
      });
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return student;
  },
  searchItems: async (root, {
    keyWord
  }) => {
    let db, items, courses, people;

    try {
      db = await (0, _db.connectDB)();
      courses = await db.collection('courses').find({
        $text: {
          $search: keyWord
        }
      }).toArray();
      people = await db.collection('students').find({
        $text: {
          $search: keyWord
        }
      }).toArray();
      items = [...courses, ...people];
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return items;
  }
};
exports.default = _default;