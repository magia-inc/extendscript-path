import { FunctionType } from "./types";
import { createJsDocString } from "./createJsDocString";
import { createMethodsString } from "./createMethodsString";

export const createOutputFileString = (
  functionTypes: FunctionType[]
): string => {
  const methodsString = functionTypes
    .map((fnType) => {
      return createJsDocString(fnType) + "\n" + createMethodsString(fnType);
    })
    .join("\n");

  return template(methodsString, "cjs");
};

const template = (methods: string, moduleType: "esm" | "cjs") => {
  return `/// <reference types="types-for-adobe/AfterEffects/2018"/>

const extendscriptPath = (fn) => {
  return {
${methods.split("\n").join("\n    ")}
  }
}

${
  moduleType === "esm"
    ? "export default extendscriptPath"
    : "module.exports = extendscriptPath"
}
`;
};
