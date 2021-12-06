export const addDirectiveToAST = (astNode, directiveDefAST) => {
  astNode.directives.push(directiveDefAST);
};
