import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import { isIdentifier } from "@babel/types"
import fs from 'fs';

const code = fs.readFileSync("./fixtures/functionInfo.js").toString();
const ast = parser.parse(code);

const functionNames: string[] = [];
const varNames: string[] = [];

traverse(ast, {
  FunctionDeclaration: {
    enter(path, state) {
      const nodeId = path.node.id
      if (nodeId) {
        functionNames.push(nodeId.name);
      }
    }
  },

  VariableDeclaration: {
    enter(path, state) {
      path.node.declarations
          .forEach(item => {
            if (isIdentifier(item.id)) {
              varNames.push(item.id.name)
            }
          })
    }
  }
});

console.log('function names:', functionNames)
console.log('var names: ', varNames)