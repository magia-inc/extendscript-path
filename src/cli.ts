import { getFunctionTypes, getSourceFile } from "./getFunctionTypes";
import { createOutputFileString } from "./createOutputFileString";
import { writeFile } from "fs/promises";
import minimist from "minimist";
import { Argv, isArgv } from "./types";

const cli = async ({ file, config, output }: Argv) => {
  const sourceFile = getSourceFile(config, file);
  if (!sourceFile.ok) throw new Error(sourceFile.err);
  const functionType = getFunctionTypes(sourceFile.val);
  if (!functionType.ok) throw new Error("関数の型の取得でエラーが発生しました");
  const writeText = createOutputFileString(functionType.val);
  await writeFile(output, writeText);
};

const argv = minimist(process.argv.slice(2), {
  string: ["file", "tsconfig", "output"],
  alias: { f: "file", c: "tsconfig", o: "output" },
});

isArgv(argv) ? cli(argv) : console.error("argv error");
