import { createContext } from "react";

interface IScoreContext {
  setScore: (type: number) => void;
}

export const StateContext = createContext<IScoreContext>({
  setScore: () => {},
});
