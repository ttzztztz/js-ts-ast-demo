import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import fs from 'fs';

const code = fs.readFileSync("./fixtures/order.js").toString();
const ast = parser.parse(code);

const functionNames1: string[] = [];
const functionNames2: string[] = [];


traverse(ast, {
  FunctionDeclaration: {
    enter(path) {
      const nodeId = path.node.id
      if (nodeId) {
        functionNames1.push(nodeId.name);
      }
    }
  },
});

traverse(ast, {
  FunctionDeclaration: {
    exit(path) {
      const nodeId = path.node.id
      if (nodeId) {
        functionNames2.push(nodeId.name);
      }
    }
  },
});

console.log(functionNames1.join(','))
console.log(functionNames2.join(','))