export type FunctionType = {
  name: string;
  params: Params[];
  returnType: string;
};

export type Params = { name: string; types: string };
