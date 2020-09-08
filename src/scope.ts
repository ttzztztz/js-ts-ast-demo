import * as parser from "@babel/parser";
import traverse, { Binding } from "@babel/traverse";
import fs from 'fs';

const code = fs.readFileSync("./fixtures/scope.js").toString();
const ast = parser.parse(code);

const scopeBindings: {
    [key: string]: { [name: string]: Binding } | undefined;
} = {}

traverse(ast, {
  VariableDeclaration: {
    enter(path, state) {
      const { scope : { block, bindings } } = path;
      if (block.start && block.end) {
        const _code = code.substring(block.start, block.end)
        scopeBindings[_code] = bindings
      }
    }
  }
});

debugger;
