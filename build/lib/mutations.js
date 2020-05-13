"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = require("./db");

var _mongodb = require("mongodb");

var _errorHandler = require("./errorHandler");

var _default = {
  createCourse: async (root, {
    input
  }) => {
    const defaults = {
      teacher: '',
      topic: ''
    };
    const newCourse = Object.assign(defaults, input);
    let db;
    let course;

    try {
      db = await (0, _db.connectDB)();
      course = await db.collection('courses').insertOne(newCourse);
      newCourse._id = course.insertedId;
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return newCourse;
  },
  editCourse: async (root, {
    id,
    input
  }) => {
    let db;
    let course;

    try {
      db = await (0, _db.connectDB)();
      await db.collection('courses').updateOne({
        _id: (0, _mongodb.ObjectID)(id)
      }, {
        $set: input
      });
      course = await db.collection('courses').findOne({
        _id: (0, _mongodb.ObjectID)(id)
      });
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return course;
  },
  deleteCourse: async (root, {
    id
  }) => {
    let db;

    try {
      db = await (0, _db.connectDB)();
      await db.collection('courses').deleteOne({
        _id: (0, _mongodb.ObjectID)(id)
      });
      return true;
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
      return false;
    }
  },
  createPerson: async (root, {
    input
  }) => {
    let db;
    let student;

    try {
      db = await (0, _db.connectDB)();
      student = await db.collection('students').insertOne(input);
      input._id = student.insertedId;
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return input;
  },
  editPerson: async (root, {
    id,
    input
  }) => {
    let db;
    let student;

    try {
      db = await (0, _db.connectDB)();
      await db.collection('students').updateOne({
        _id: (0, _mongodb.ObjectID)(id)
      }, {
        $set: input
      });
      student = await db.collection('students').findOne({
        _id: (0, _mongodb.ObjectID)(id)
      });
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return student;
  },
  deletePerson: async (root, {
    id
  }) => {
    let db;

    try {
      db = await (0, _db.connectDB)();
      await db.collection('students').deleteOne({
        _id: (0, _mongodb.ObjectID)(id)
      });
      return true;
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
      return false;
    }
  },
  addPeople: async (root, {
    courseID,
    personID
  }) => {
    let db;
    let person;
    let course;

    try {
      db = await (0, _db.connectDB)();
      course = await db.collection('courses').findOne({
        _id: (0, _mongodb.ObjectID)(courseID)
      });
      person = await db.collection('students').findOne({
        _id: (0, _mongodb.ObjectID)(personID)
      });
      if (!course || !person) throw new Error('La persona o el curso no existe');
      await db.collection('courses').updateOne({
        _id: (0, _mongodb.ObjectID)(courseID)
      }, {
        $addToSet: {
          people: (0, _mongodb.ObjectID)(personID)
        }
      });
    } catch (error) {
      console.error(error);
      (0, _errorHandler.errorHandler)(error);
    }

    return course;
  }
};
exports.default = _default;