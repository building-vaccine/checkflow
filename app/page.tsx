"use client";

import Link from "next/link";
import { getBrowserId } from "@/src/lib/browserId";
import { useEffect, useState } from "react";
import TodoForm from "@/src/components/TodoForm";
import TodoList from "@/src/components/TodoList";
import { supabase } from "@/src/lib/supabase";
import type { Todo } from "@/src/types/todo";
import ChecklistCard from "@/src/components/ChecklistCard";
import { checklists } from "@/src/data/checklists";
import { useTodos } from "@/src/hooks/useTodos";

export default function Home() {
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const {
    todos,
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    addTemplate,
  } = useTodos();

  useEffect(() => {
    loadTodos();
  }, []);

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
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "rounded-lg bg-blue-600 px-3 py-2 text-white"
                : "rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 hover:bg-slate-100"
            }
          >
            すべて
          </button>

          <button
            onClick={() => setFilter("active")}
            className={
              filter === "active"
                ? "rounded-lg bg-blue-600 px-3 py-2 text-white"
                : "rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 hover:bg-slate-100"
            }
          >
            未完了
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={
              filter === "completed"
                ? "rounded-lg bg-blue-600 px-3 py-2 text-white"
                : "rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 hover:bg-slate-100"
            }
          >
            完了
          </button>
        </div>

        {editingId !== null && (
          <div className="mt-6 rounded-lg border border-slate-300 bg-white p-4">
            <h2 className="mb-3 font-semibold text-slate-900">
              項目を編集
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="w-full flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />

              <button
                onClick={updateTodo}
                className="w-full rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700 sm:w-auto"
              >
                保存
              </button>

              <button
                onClick={() => {
                  setEditingId(null);
                  setEditingText("");
                }}
                className="w-full rounded-lg bg-slate-300 px-5 py-2 font-semibold text-slate-900 hover:bg-slate-400 sm:w-auto"
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

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          startEdit={startEdit}
        />

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            よく使われるテンプレート
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {checklists.map((template) => (
              <ChecklistCard
                key={template.slug}
                checklist={template}
              />
            ))}
          </div>
        </div>

        <section className="mt-12 border-t border-slate-300 pt-8">
          <h2 className="text-2xl font-bold text-slate-900">
            CheckFlowとは
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            CheckFlowは、ログイン不要で使える無料のオンラインチェックリストです。
            買い物リスト、旅行の持ち物、引っ越し準備、仕事や日常のタスク管理など、
            思いついたことをすぐに記録できます。
          </p>

          <p className="mt-4 leading-8 text-slate-700">
            会員登録は必要ありません。
            ブラウザごとにデータを保存するため、アクセスした瞬間から利用できます。
            パソコン・スマートフォンのどちらでも快適に利用できます。
          </p>

          <h2 className="mt-10 text-2xl font-bold text-slate-900">
            主な特徴
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            <li>ログイン不要</li>
            <li>完全無料</li>
            <li>チェック・編集・削除に対応</li>
            <li>スマホ・PC対応</li>
            <li>シンプルで使いやすいデザイン</li>
          </ul>
        </section>

        <section className="mt-10">
          <a
            href="/templates"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
          >
            テンプレートをもっと見る →
          </a>
        </section>
      </div>
    </main>
  );
}