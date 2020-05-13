"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = require("./db");

var _mongodb = require("mongodb");

var _default = {
  Course: {
    people: async ({
      people
    }) => {
      let db, peopleData, ids;

      try {
        db = await (0, _db.connectDB)();
        ids = people ? people.map(id => (0, _mongodb.ObjectID)(id)) : [];
        peopleData = ids.length > 0 ? await db.collection('students').find({
          _id: {
            $in: ids
          }
        }).toArray() : [];
      } catch (error) {
        console.error(error);
      }

      return peopleData;
    }
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) return 'Monitor';
      return 'Student';
    }
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) return 'Course';
      if (item.phone) return 'Monitor';
      return 'Student';
    }
  }
};
exports.default = _default;