"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";
import TodoForm from "@/components/TodoForm";

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

        <TodoForm
          text={text}
          setText={setText}
          addTodo={addTodo}
        />

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