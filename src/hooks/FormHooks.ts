// formHooks.ts
import { useContext } from "react";
import { ErrorsContext, LabelWidthContext } from "../contexts/formContexts";

export function useErrors() {
  return useContext(ErrorsContext);
}

export function useLabelWidth() {
  return useContext(LabelWidthContext);
}
