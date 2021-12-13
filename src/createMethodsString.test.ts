import { createMethodsString } from "./createMethodsString";
import { FunctionType } from "./types";

describe("createMethodsString", () => {
  test("FunctionTypeをオブジェクトの要素として出力", () => {
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
    expect(createMethodsString(test1)).toBe("f1:() => fn(`f1()`),");
    expect(createMethodsString(test2)).toBe(
      "f2:(p1, p2, p3) => fn(`f2('${p1}', '${p2}', '${p3}')`),"
    );
  });
});
