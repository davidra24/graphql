import { connectDB } from './db';
import { ObjectID } from 'mongodb';
import { errorHandler } from './errorHandler';

export default {
  getCourses: async () => {
    let db,
      courses = [];
    try {
      db = await connectDB();
      courses = await db.collection('courses').find().toArray();
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return courses;
  },
  getCourse: async (root, { id }) => {
    let db,
      course = {};
    try {
      db = await connectDB();
      course = await db.collection('courses').findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return course;
  },
  getPeople: async () => {
    let db,
      students = [];
    try {
      db = await connectDB();
      students = await db.collection('students').find().toArray();
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return students;
  },
  getPerson: async (root, { id }) => {
    let db,
      student = {};
    try {
      db = await connectDB();
      student = await db.collection('students').findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return student;
  },
  searchItems: async (root, { keyWord }) => {
    let db, items, courses, people;
    try {
      db = await connectDB();
      courses = await db
        .collection('courses')
        .find({ $text: { $search: keyWord } })
        .toArray();
      people = await db
        .collection('students')
        .find({ $text: { $search: keyWord } })
        .toArray();
      items = [...courses, ...people];
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
    return items;
  },
};
