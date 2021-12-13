import { FunctionType } from "./types";

export const createMethodsString = ({ name, params }: FunctionType): string => {
  return `${name}:(${params
    .map(({ name }) => name)
    .join(", ")}) => fn(\`${name}(${params
    .map(({ name }) => "'${" + name + "}'")
    .join(", ")})\`),`;
};
