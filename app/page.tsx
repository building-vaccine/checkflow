"use client";

import { useEffect, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";

export default function Home() {
const [text, setText] = useState("");
const [todos, setTodos] = useState<Todo[]>([]);
const [editingId, setEditingId] = useState<number | null>(null);
const [editingText, setEditingText] = useState("");

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

    setTodos(
      (data ?? []).sort((a, b) => {
        if (a.checked === b.checked) return 0;
        return a.checked ? 1 : -1;
      })
    );
  }

async function addTodo() {
  const value = text.trim();

  if (!value) return;

  const { data, error } = await supabase
    .from("todos")
    .insert({
      text: value,
      checked: false,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    alert("追加に失敗しました。");
    return;
  }

  setTodos((prev) => [...prev, data]);
  setText("");
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

  async function updateTodo() {
    if (editingId === null) return;

    const value = editingText.trim();

    if (!value) return;

    const { error } = await supabase
      .from("todos")
      .update({
        text: value,
      })
      .eq("id", editingId);

    if (error) {
      console.error(error);
      return;
    }

    setEditingId(null);
    setEditingText("");

    loadTodos();
  }

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
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

        {editingId !== null && (
          <div className="mt-6 rounded-lg border bg-slate-50 p-4">
            <h2 className="mb-3 font-semibold">
              項目を編集
            </h2>

            <div className="flex gap-3">
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="flex-1 rounded-lg border px-4 py-2"
              />

              <button
                onClick={updateTodo}
                className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
              >
                保存
              </button>

              <button
                onClick={() => {
                  setEditingId(null);
                  setEditingText("");
                }}
                className="rounded-lg bg-slate-300 px-5 py-2 hover:bg-slate-400"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
        />
      </div>
    </main>
  );
}