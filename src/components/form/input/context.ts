import { createContext, useContext } from "react";

type InputContextType = {
  id: string;
};

export const InputContext = createContext<InputContextType | null>(null);

export const useInputContext = () => {
  const ctx = useContext(InputContext);
  if (!ctx)
    throw new Error("Input subcomponents must be used within <Input.Root>");
  return ctx;
};
