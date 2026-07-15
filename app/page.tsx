"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Todo = {
  id: number;
  text: string;
  checked: boolean;
  created_at: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setTodos(data ?? []);
  }

  async function addTodo() {
    if (!text.trim()) return;

    const { error } = await supabase.from("todos").insert({
      text,
      checked: false,
    });

    if (error) {
      console.error(error);
      alert("追加に失敗しました。");
      return;
    }

    setText("");
    loadTodos();
  }

  async function toggleTodo(todo: Todo) {
    const { error } = await supabase
      .from("todos")
      .update({
        checked: !todo.checked,
      })
      .eq("id", todo.id);

    if (error) {
      console.error(error);
      return;
    }

    loadTodos();
  }

  async function deleteTodo(id: number) {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    loadTodos();
  }

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
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />

          <button
            onClick={addTodo}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            追加
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {todos.length === 0 ? (
            <p className="text-slate-500">
              まだ項目がありません。
            </p>
          ) : (
            todos.map((todo) => (
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
            ))
          )}
        </div>
      </div>
    </main>
  );
}