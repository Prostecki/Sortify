import { useState, useRef, useContext, createContext } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  return <TodoContext.Provider>{children}</TodoContext.Provider>;
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Todo context error");
  }
  return context;
}
