import { createParamsJsDoc, createReturnJsDoc } from "./createJsDocString";
import { FunctionType } from "./types";

const test1: FunctionType = {
  name: "f1",
  params: [],
  returnType: "null",
};
const test2: FunctionType = {
  name: "f2",
  params: [
    { name: "p1", types: "string" },
    { name: "p2", types: "number[]" },
    { name: "p3", types: "Record<string,string>" },
  ],
  returnType: "string",
};

describe("createJsDocString", () => {});

describe("createParamsJsDoc", () => {
  test("引数を示すjsdocを作る", () => {
    expect(createParamsJsDoc(test1.params)).toMatch("");

    const test2Result: string = `* @param {string} p1
* @param {number[]} p2
* @param {Record<string,string>} p3`;
    expect(createParamsJsDoc(test2.params)).toMatch(test2Result);
  });
});

describe("createReturnJsDoc", () => {
  test("戻り値を示すjsdocを作る", () => {
    expect(createReturnJsDoc(test1.returnType)).toBe("* @return {null}");
    expect(createReturnJsDoc(test2.returnType)).toBe("* @return {string}");
  });
});
