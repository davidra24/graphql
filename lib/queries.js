import { connectDB } from './db';
import { ObjectID } from 'mongodb';

export default {
  getCourses: async () => {
    let db,
      courses = [];
    try {
      db = await connectDB();
      courses = await db.collection('courses').find().toArray();
    } catch (error) {
      console.error(error);
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
    }
    return course;
  },
};
