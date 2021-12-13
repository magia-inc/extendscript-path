import { getFunctionTypes, getSourceFile } from "./getFunctionTypes";
import { createOutputFileString } from "./createOutputFileString";
import { writeFile } from "fs/promises";
import minimist from "minimist";
import { Argv, isArgv } from "./types";
import chokidar from "chokidar";

const build = async ({ file, config, output }: Argv) => {
  const sourceFile = getSourceFile(config, file);
  if (!sourceFile.ok) throw new Error(sourceFile.err);
  const functionType = getFunctionTypes(sourceFile.val);
  if (!functionType.ok) throw new Error("関数の型の取得でエラーが発生しました");
  const writeText = createOutputFileString(functionType.val);
  await writeFile(output, writeText);
};

const watch = async (argv: Argv) => {
  console.log("watch mode");
  const watcher = chokidar.watch([argv.file, argv.config], {
    persistent: true,
  });
  watcher
    .on("ready", () => {
      console.log("start watching");
      console.log(`file ${argv.file}`);
      console.log(`tsconfig ${argv.config}`);
    })
    .on("change", () => {
      console.log("build start");
      build(argv).then(() => console.log("build finished"));
    });
};

const argv = minimist(process.argv.slice(2), {
  string: ["file", "tsconfig", "output", "watch"],
  alias: { f: "file", c: "tsconfig", o: "output", w: "watch" },
  boolean: "watch",
});

console.log(argv);

isArgv(argv)
  ? argv.watch
    ? watch(argv)
    : build(argv)
  : console.error("argv error");
