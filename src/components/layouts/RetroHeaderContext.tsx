import { createContext } from "react";

type HeaderHandler = () => void;

const RetroHeaderContext = createContext<{
  setHandlerOnAddTask: React.Dispatch<
    React.SetStateAction<HeaderHandler | undefined>
  >;
  handlerOnAddTask?: HeaderHandler;
}>({
  setHandlerOnAddTask: () => {},
});

export default RetroHeaderContext;
