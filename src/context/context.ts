import { createContext } from "react";
import { ITodo } from "../types/types";

export type TodoContextType = {
  data: ITodo[],
  selectedData: ITodo[],
  mode: boolean,
  saveTodo: (todo: ITodo) => void,
  saveSelectedTodos: (items: ITodo[]) => void,
  removeTodos: (todos: ITodo[]) => void,
  changeMode: () => void
}

export const TodoContext = createContext<TodoContextType | null>(null);