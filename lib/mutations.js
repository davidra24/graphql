import { connectDB } from './db';
import { ObjectID } from 'mongodb';
import { errorHandler } from './errorHandler';

export default {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: '',
    };
    const newCourse = Object.assign(defaults, input);
    let db;
    let course;
    try {
      db = await connectDB();
      course = await db.collection('courses').insertOne(newCourse);
      newCourse._id = course.insertedId;
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return newCourse;
  },
  editCourse: async (root, { id, input }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      await db
        .collection('courses')
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      course = await db.collection('courses').findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return course;
  },
  deleteCourse: async (root, { id }) => {
    let db;
    try {
      db = await connectDB();
      await db.collection('courses').deleteOne({ _id: ObjectID(id) });
      return true;
    } catch (error) {
      console.error(error);
      errorHandler(error);
      return false;
    }
  },
  createPerson: async (root, { input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      student = await db.collection('students').insertOne(input);
      input._id = student.insertedId;
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return input;
  },
  editPerson: async (root, { id, input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      await db
        .collection('students')
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      student = await db.collection('students').findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return student;
  },
  deletePerson: async (root, { id }) => {
    let db;
    try {
      db = await connectDB();
      await db.collection('students').deleteOne({ _id: ObjectID(id) });
      return true;
    } catch (error) {
      console.error(error);
      errorHandler(error);
      return false;
    }
  },
  addPeople: async (root, { courseID, personID }) => {
    let db;
    let person;
    let course;
    try {
      db = await connectDB();
      course = await db
        .collection('courses')
        .findOne({ _id: ObjectID(courseID) });
      person = await db
        .collection('students')
        .findOne({ _id: ObjectID(personID) });

      if (!course || !person)
        throw new Error('La persona o el curso no existe');

      await db
        .collection('courses')
        .updateOne(
          { _id: ObjectID(courseID) },
          { $addToSet: { people: ObjectID(personID) } }
        );
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return course;
  },
};
