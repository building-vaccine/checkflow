"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!text.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        checked: false,
      },
    ]);

    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, checked: !todo.checked }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">
          CheckFlow
        </h1>

        <p className="mt-2 text-slate-600">
          シンプルなチェックリスト
        </p>

        <div className="mt-8 flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="項目を入力"
            className="flex-1 rounded-lg border px-4 py-3"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />

          <button
            onClick={addTodo}
            className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700"
          >
            追加
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {todos.length === 0 && (
            <p className="text-slate-500">
              まだ項目がありません。
            </p>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo.id)}
                />

                <span
                  className={
                    todo.checked
                      ? "line-through text-slate-400"
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
      </div>
    </main>
  );
}