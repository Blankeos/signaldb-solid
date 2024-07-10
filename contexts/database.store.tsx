import { initTodosCollection, TodosCollection } from "@/database/models/todos";
import {
  Accessor,
  createContext,
  createSignal,
  FlowComponent,
  onMount,
  useContext,
} from "solid-js";

// ===========================================================================
// Context
// ===========================================================================

export type DatabaseValue = {
  Todos: Accessor<TodosCollection | undefined>;
};

const Database = createContext<DatabaseValue>({
  Todos: () => undefined,
} as DatabaseValue);

// ===========================================================================
// Hook
// ===========================================================================
export const useDatabase = () => useContext(Database);

// ===========================================================================
// Provider
// ===========================================================================
export const DatabaseProvider: FlowComponent = (props) => {
  const [todos, setTodos] = createSignal<ReturnType<DatabaseValue["Todos"]>>();

  onMount(() => {
    setTodos(initTodosCollection());
  });

  return (
    <Database.Provider
      value={{
        Todos: todos,
      }}
    >
      {props.children}
    </Database.Provider>
  );
};
