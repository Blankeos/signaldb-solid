import { useDatabase } from "@/contexts/database.store";
import { createEffect, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export default function Page() {
  const database = useDatabase();
  const [text, setText] = createSignal("");
  const [todos, setTodos] = createStore([]);

  const todosList = createMemo(() => {
    if (!database?.Todos()) return [];

    return database.Todos()!.find({}).fetch();
  });

  createEffect(() => {
    const a = database
      .Todos()!
      .find(
        {},
        {
          sort: { createdAt: -1 },
        }
      )
      .fetch();

    console.log(a, "yoyoyo");
  });

  function addTodo() {
    if (text() === "") return;

    database.Todos()?.insert({
      done: false,
      content: text(),
    });

    setText("");
  }

  return (
    <>
      <h1>My Vike + Solid app</h1>

      <div class="flex items-center gap-x-2 h-12 px-7">
        <p>Todo</p>
        <input
          type="text"
          class="rounded p-2 border h-full"
          value={text()}
          placeholder="Buy Apples "
          onInput={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <button class="px-2 rounded border h-full flex items-center" onClick={addTodo}>
          Add
        </button>
        {text()}
      </div>

      {JSON.stringify(todos)}
    </>
  );
}

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count()}
    </button>
  );
}
