const resolvers = {
  Query: {
    hello: () => {
      return 'Hello';
    },
    getUser: (parent, args) => {
      return {
        firstName: `This is firstName of user having id: ${parent.id}`,
      };
    },
  },
  User: {
    book: (parent) => {
      console.log(parent);
      return { book: parent.book }
    }
  }
};
export { resolvers };
