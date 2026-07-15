import type { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
};

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
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
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => toggleTodo(todo)}
            />

            <span
              className={
                todo.checked
                  ? "text-slate-400 line-through"
                  : ""
              }
            >
              {todo.text}
            </span>
          </label>

          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}