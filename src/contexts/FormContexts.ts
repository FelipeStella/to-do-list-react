import { createContext } from "react";

// Tipagem para erro
type ErrorFormItem = {
  field: string;
  message: string;
};

// Contextos
export const ErrorsContext = createContext<ErrorFormItem[] | undefined>(
  undefined
);
export const LabelWidthContext = createContext<number | string | undefined>(
  undefined
);
