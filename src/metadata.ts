import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import fs from 'fs';

const code = fs.readFileSync("./fixtures/functionInfo.js").toString();
const ast = parser.parse(code);

const functionNames: string[] = [];

traverse(ast, {
  FunctionDeclaration: {
    enter(path, state) {
      const nodeId = path.node.id
      if (nodeId) {
        functionNames.push(nodeId.name);
      }
    }
  }
});

console.log(functionNames)