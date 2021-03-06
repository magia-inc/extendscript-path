import { FunctionType } from "./types";

export const createJsDocString = (functionType: FunctionType): string => {
  return `/**
${createParamsJsDoc(functionType.params)}
${createReturnJsDoc(functionType.returnType)}
*/
  `;
};

export const createParamsJsDoc = (params: FunctionType["params"]): string => {
  return params
    .map(({ name, types }) => `* @param {${types}} ${name}`)
    .join("\n");
};

export const createReturnJsDoc = (
  returnType: FunctionType["returnType"]
): string => `* @return {${returnType}}`;
