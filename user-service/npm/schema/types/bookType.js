import { GraphQLObjectType, GraphQLDirective } from 'graphql/type';
import { DirectiveLocation, specifiedDirectives, Kind } from 'graphql';
import { GraphQLID } from 'graphql/type/scalars';

const bookType = new GraphQLObjectType({
  name: 'Book',
  // astNode: {
  //   kind: Kind.OBJECT_TYPE_EXTENSION, name: { kind: "Name", value: "Book" }, interfaces: [], directives: [
  //     {
  //       kind: Kind.DIRECTIVE,
  //       name: {
  //         kind: Kind.NAME,
  //         value: "key"
  //       },
  //       arguments: [
  //         {
  //           kind: Kind.ARGUMENT,
  //           name: {
  //             kind: Kind.NAME,
  //             value: "fields"
  //           },
  //           value: {
  //             kind: Kind.STRING,
  //             value: "id",
  //             block: false
  //           }
  //         }
  //       ]
  //     }
  //   ],
  //   fields: [
  //     {
  //       kind: Kind.FIELD_DEFINITION,
  //       name: {
  //         kind: Kind.NAME,
  //         value: "id"
  //       },
  //       arguments: [

  //       ],
  //       type: {
  //         kind: Kind.NON_NULL_TYPE,
  //         type: {
  //           kind: Kind.NAMED_TYPE,
  //           name: {
  //             kind: Kind.NAME,
  //             value: "ID"
  //           }
  //         }
  //       },
  //       directives: [
  //         {
  //           kind: Kind.DIRECTIVE,
  //           name: {
  //             kind: Kind.NAME,
  //             value: "external"
  //           },
  //           arguments: [

  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
  // extensionASTNodes: [{
  //   kind: Kind.OBJECT_TYPE_EXTENSION, name: { kind: "Name", value: "Book" }, interfaces: [], directives: [
  //     {
  //       kind: Kind.DIRECTIVE,
  //       name: {
  //         kind: Kind.NAME,
  //         value: "key"
  //       },
  //       arguments: [
  //         {
  //           kind: Kind.ARGUMENT,
  //           name: {
  //             kind: Kind.NAME,
  //             value: "fields"
  //           },
  //           value: {
  //             kind: Kind.STRING,
  //             value: "id",
  //             block: false
  //           }
  //         }
  //       ]
  //     }
  //   ],
  //   fields: [
  //     {
  //       kind: Kind.FIELD_DEFINITION,
  //       name: {
  //         kind: Kind.NAME,
  //         value: "id"
  //       },
  //       arguments: [

  //       ],
  //       type: {
  //         kind: Kind.NON_NULL_TYPE,
  //         type: {
  //           kind: Kind.NAMED_TYPE,
  //           name: {
  //             kind: Kind.NAME,
  //             value: "ID"
  //           }
  //         }
  //       },
  //       directives: [
  //         {
  //           kind: Kind.DIRECTIVE,
  //           name: {
  //             kind: Kind.NAME,
  //             value: "external"
  //           },
  //           arguments: [

  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }],
});

// builder.addType({
//   name: '',
//   description: '',
//   fields: {
//     userName: {
//       type:
//     }
//   },
//  directives: []
// })

export { bookType };
