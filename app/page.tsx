"use client";

import { useEffect, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";

export default function Home() {
const [text, setText] = useState("");
const [todos, setTodos] = useState<Todo[]>([]);
const [searchText, setSearchText] = useState("");
const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
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

  async function deleteCompletedTodos() {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("checked", true);

    if (error) {
      console.error(error);
      return;
    }

    loadTodos();
  }

  function exportTodos() {
    const blob = new Blob(
      [JSON.stringify(todos, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "checkflow-backup.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  async function importTodos(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const text = await file.text();
    let importedTodos;

    try {
      importedTodos = JSON.parse(text);
    } catch (error) {
      console.error(error);
      alert("JSONファイルの形式が正しくありません。");
      return;
    }

    for (const todo of importedTodos) {
      await supabase.from("todos").insert({
        text: todo.text,
        checked: todo.checked,
      });
    }

    loadTodos();

    event.target.value = "";
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

  const completedCount = todos.filter((todo) => todo.checked).length;
  const totalCount = todos.length;

  const filteredTodos = todos.filter((todo) => {
    const matchText = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !todo.checked
        : todo.checked;

    return matchText && matchFilter;
  });

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">
          CheckFlow
        </h1>

        <p className="mt-2 text-slate-600">
          シンプルなチェックリスト
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {totalCount}件中 {completedCount}件完了
        </p>

        <TodoForm
          text={text}
          setText={setText}
          addTodo={addTodo}
        />

        <div className="mt-6">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="項目を検索..."
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className="rounded-lg border px-3 py-2"
          >
            すべて
          </button>

          <button
            onClick={() => setFilter("active")}
            className="rounded-lg border px-3 py-2"
          >
            未完了
          </button>

          <button
            onClick={() => setFilter("completed")}
            className="rounded-lg border px-3 py-2"
          >
            完了
          </button>
        </div>

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

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={deleteCompletedTodos}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            完了した項目を削除
          </button>
        </div>

        <button
          onClick={exportTodos}
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          エクスポート
        </button>

        <label className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          インポート
          <input
            type="file"
            accept=".json"
            onChange={importTodos}
            className="hidden"
          />
        </label>

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
        />
      </div>
    </main>
  );
}