import { z } from "zod";

export type FunctionType = {
  name: string;
  params: Params[];
  returnType: string;
};

export type Params = { name: string; types: string };

const argvSchema = z.object({
  file: z.string(),
  config: z.string(),
  output: z.string(),
  watch: z.boolean().optional(),
  valFunc: z.string().array().optional(),
});
export type Argv = z.infer<typeof argvSchema>;
export const isArgv = (input: unknown): input is Argv =>
  argvSchema.safeParse(input).success;
