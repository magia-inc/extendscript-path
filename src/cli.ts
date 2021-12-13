import { getFunctionTypes, getSourceFile } from "./getFunctionTypes";
import { createOutputFileString } from "./createOutputFileString";
import { writeFile } from "fs/promises";
import minimist from "minimist";
import { z } from "zod";

const cli = async ({ file, config }: Argv) => {
  const sourceFile = getSourceFile(config, file);
  if (!sourceFile.ok) throw new Error(sourceFile.err);
  const functionType = getFunctionTypes(sourceFile.val);
  if (!functionType.ok) throw new Error("関数の型の取得でエラーが発生しました");
  const writeText = createOutputFileString(functionType.val);
  await writeFile("./output.js", writeText);
};

const argvSchema = z.object({
  file: z.string(),
  config: z.string(),
});
type Argv = z.infer<typeof argvSchema>;
const isArgv = (input: unknown): input is Argv =>
  argvSchema.safeParse(input).success;

const argv = minimist(process.argv.slice(2), {
  string: ["file", "tsconfig"],
  alias: { f: "file", c: "tsconfig" },
});

isArgv(argv) ? cli(argv) : console.error("argv error");
