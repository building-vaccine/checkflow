import { getBrowserId } from "@/src/lib/browserId";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import type { Todo } from "@/src/types/todo";
import { checklists } from "@/src/data/checklists";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");

    async function loadTodos() {
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .eq("browser_id", getBrowserId())
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
                browser_id: getBrowserId(),
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
            .eq("id", todo.id)
            .eq("browser_id", getBrowserId());

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
            .eq("id", id)
            .eq("browser_id", getBrowserId());

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
            .eq("id", editingId)
            .eq("browser_id", getBrowserId());

        if (error) {
            console.error(error);
            return;
        }

        setEditingId(null);
        setEditingText("");

        loadTodos();
    }

    const addTemplate = async (templateId: string) => {
        if (
            !confirm(
                "テンプレートを追加しますか？\n現在のチェックリストはそのまま残ります。"
            )
        ) {
            return;
        }

        const template = checklists.find((t) => t.slug === templateId);

        if (!template) return;

        const rows = template.items.map((item) => ({
            text: item,
            checked: false,
            browser_id: getBrowserId(),
        }));

        const { error } = await supabase
            .from("todos")
            .insert(rows);

        if (error) {
            console.error(error);
            return;
        }

        await loadTodos();
    };

    return {
        todos,
        loadTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        addTemplate,
    };
}

