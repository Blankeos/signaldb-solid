import { createLocalStorageAdapter, ReplicatedCollection } from "signaldb";
// import reactivityAdapter from "signaldb-plugin-maverickjs";
import reactivityAdapter from "signaldb-plugin-solid";

async function placeholderFetch() {}

type TodoSchema = {
  id: string;
  done: boolean;
  content: string;
};

export type TodosCollection = ReturnType<typeof initTodosCollection>;

export function initTodosCollection() {
  const Todos = new ReplicatedCollection<TodoSchema>({
    persistence: createLocalStorageAdapter("todos"),
    reactivity: reactivityAdapter,
    pull: async () => {
      // const result: {
      //   total: number,
      //   documents: {
      //     $id: string,
      //     text: string,
      //     completed: boolean,
      //   }[],
      // } = await authenticatedFetch('/collections/todos/documents').then(res => res.json())
      // return {
      //   items: result.documents.map(item => ({
      //     id: item.$id,
      //     text: item.text,
      //     completed: item.completed,
      //   })),
      // }
      await placeholderFetch();

      return { items: [] };
    },
    push: async (changes) => {
      // await Promise.all([
      //   ...changes.added.map(async (item) => {
      //     await authenticatedFetch("/collections/todos/documents", {
      //       method: "POST",
      //       body: JSON.stringify({
      //         documentId: item.id,
      //         data: {
      //           text: item.text,
      //           completed: item.completed,
      //         },
      //       }),
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
      //   }),
      //   ...changes.modified.map(async (item) => {
      //     await authenticatedFetch(`/collections/todos/documents/${item.id}`, {
      //       method: "PATCH",
      //       body: JSON.stringify({
      //         data: {
      //           text: item.text,
      //           completed: item.completed,
      //         },
      //       }),
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
      //   }),
      //   ...changes.removed.map(async (item) => {
      //     await authenticatedFetch(`/collections/todos/documents/${item.id}`, {
      //       method: "DELETE",
      //     });
      //   }),
      // ]);
    },
  });

  Todos.on("persistence.error", (error) => {
    // eslint-disable-next-line no-console
    console.error("persistence.error", error);
  });

  return Todos;
}
