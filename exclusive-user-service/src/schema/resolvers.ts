const resolvers = {
  Query: {
    hello: () => {
      return 'Hello';
    },
    getUser: (parent: any, args: any) => {
      console.log(args);

      return {
        firstName: 'mdhlşdlşrh',
      };
    },
  },
  User: {
    books: (parent: any, args: any) => {
      console.log(parent, args);

      return [];
    },
  },
};
export { resolvers };
