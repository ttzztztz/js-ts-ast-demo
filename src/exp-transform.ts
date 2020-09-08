import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { types as t } from "@babel/core";
import { Expression } from "@babel/types";

import fs from "fs";

const code = fs.readFileSync("./fixtures/exp_operator.js").toString();
const ast = parser.parse(code);

traverse(ast, {
  BinaryExpression: {
    exit(path) {
      const { left, right, operator } = path.node;

      if (operator === '**') {
        const newExpr = t.callExpression(
          t.memberExpression(t.identifier("Math"), t.identifier("pow")),
          [left as Expression, right]
        );

        path.replaceWith(newExpr);
      }
    },
  },
});

const output = generate(
  ast,
  {
    sourceMaps: true,
    sourceFileName: 'test.js'
  },
  code
);

console.log(output);
