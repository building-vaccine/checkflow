import type { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  startEdit: (todo: Todo) => void;
};

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  startEdit,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-slate-500">
          まだ項目がありません。
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <label className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => toggleTodo(todo)}
            />

            <span
              className={
                todo.checked
                  ? "flex-1 text-slate-400 line-through"
                  : "flex-1 text-slate-900"
              }
            >
              {todo.text}
            </span>
          </label>

          <div className="ml-4 flex gap-2">
            <button
              onClick={() => startEdit(todo)}
              className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
            >
              ✏️
            </button>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}