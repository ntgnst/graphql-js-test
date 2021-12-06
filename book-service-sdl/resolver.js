const resolvers = {
  Query: {
    getBook: (parent, args) => {
      console.log(args);

      return {
        id: 1,
        pageCount: 231,
        price: 11.11,
        name: 'A'
      };
    },
  },
  Book: {
    __resolveReference(ref) {
      console.log(ref);

      return {
        id: ref.id,
        pageCount: 231,
        price: 11.11,
        name: 'A'
      }
    }
  }
};
export { resolvers };
