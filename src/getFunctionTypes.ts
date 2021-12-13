import { Node, Project, SourceFile } from "ts-morph";
import { Result } from "option-t/esm/PlainResult";
import { FunctionType, Params } from "./types";

export const getSourceFile = (
  tsconfigPath: string,
  filePath: string
): Result<SourceFile, string> => {
  const project = new Project({
    tsConfigFilePath: tsconfigPath,
  });

  const file = project.getSourceFile(filePath);
  if (file === undefined) return { ok: false, err: "ファイルが見つかりません" };
  return { ok: true, val: file };
};

const getParams = (paramsText: string): Params => {
  const params = paramsText.split(":");
  if (params.length === 1) return { name: params[0].trim(), types: "any" };
  return { name: params[0].trim(), types: params[1].trim() };
};

export const getFunctionTypes = (
  file: SourceFile
): Result<FunctionType[], string> => {
  const functions = file.getFunctions();
  const res = functions.flatMap((fn) => {
    const name = fn.getName();
    const params = fn
      .getParameters()
      .map((parameter) => getParams(parameter.getText()));
    const returnType = fn.getReturnType().getText();
    console.log(name);
    if (!name) return [];
    return { name, params, returnType };
  });

  return { ok: true, val: res };
};

export const getVariableFunctionTypes = (
  file: SourceFile,
  variableDeclaration: string[]
): Result<FunctionType[], string> => {
  const res = variableDeclaration.flatMap((valName) => {
    const functionExpression = file
      .getVariableDeclarationOrThrow(valName)
      .getInitializerOrThrow();
    if (!Node.isArrowFunction(functionExpression)) {
      console.log("skipping " + valName);
      return [];
    }
    const params = functionExpression
      .getParameters()
      .map((parameter) => getParams(parameter.getText()));
    const returnType = functionExpression.getReturnType().getText();

    return { name: valName, params, returnType };
  });
  return { ok: true, val: res };
};
