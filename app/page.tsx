"use client";

import { useEffect, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";

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

        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </main>
  );
}