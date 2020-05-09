const courses = [
  {
    _id: 'anyid',
    title: 'My Title',
    teacher: 'My Teacher',
    description: 'Description',
    topic: 'Development',
  },
  {
    _id: 'anyid1',
    title: 'My Title 1',
    teacher: 'My Teacher 1',
    description: 'Description 1',
    topic: 'Development 1',
  },
  {
    _id: 'anyid2',
    title: 'My Title 2',
    teacher: 'My Teacher 2',
    description: 'Description 2',
    topic: 'Development 2',
  },
];

export const resolvers = {
  getCourses: () => courses,
};
