import ts from "typescript";

const program = ts.createProgram(["./fixtures/type_decl.ts"], {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
});
const checker = program.getTypeChecker();

function serializeSymbol(symbol: ts.Symbol) {
  return {
    name: symbol.getName(),
    documentation: ts.displayPartsToString(
      symbol.getDocumentationComment(checker)
    ),
    type: checker.typeToString(
      checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
    ),
  };
}

function serializeSignature(signature: ts.Signature) {
  return {
    parameters: signature.parameters.map(serializeSymbol),
    returnType: checker.typeToString(signature.getReturnType()),
    documentation: ts.displayPartsToString(
      signature.getDocumentationComment(checker)
    ),
  };
}

const target_fn_names =  [
  'fn', 'fn2', 'fn3'
];

function visit(node: ts.Node) {
  if (ts.isFunctionDeclaration(node) && node.name) {
    const symbol = checker.getSymbolAtLocation(node.name);
    if (target_fn_names.includes(symbol?.name ?? '')) {
      const type = checker.getTypeAtLocation(node.name)
      const [signature] = type.getCallSignatures();
      console.log({
        name: symbol?.name,
        ...serializeSignature(signature)
      })
    }
  }

  ts.forEachChild(node, visit);
}

for (const sourceFile of program.getSourceFiles()) {
  if (!sourceFile.isDeclarationFile) {
    ts.forEachChild(sourceFile, visit);
  }
}
