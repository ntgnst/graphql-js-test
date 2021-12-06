const resolvers = {
  Query: {
    hello: () => {
      return 'Hi'
    },
    getUser: () => {
      return {
        id: 1,
        firstName: 'TEST',
        book: 4
      }
    }
  },
  User: {
    book: (parent) => {
      return { id: parent.book }
    }
  }
};

export { resolvers };
