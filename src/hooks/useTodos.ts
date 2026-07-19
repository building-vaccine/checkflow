import { getBrowserId } from "@/src/lib/browserId";
import { supabase } from "@/src/lib/supabase";
import type { Todo } from "@/src/types/todo";
import { checklists } from "@/src/data/checklists";
import { useState } from "react";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

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

    async function addTodo(text: string) {
        const value = text.trim();

        if (!value) return;

        const { error } = await supabase
            .from("todos")
            .insert({
                text: value,
                checked: false,
                browser_id: getBrowserId(),
            });

        if (error) {
            console.error(error);
            alert("追加に失敗しました。");
            return;
        }

        await loadTodos();
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

        await loadTodos();
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

        await loadTodos();
    }

    async function updateTodo(id: number, text: string) {
        const value = text.trim();

        if (!value) return;

        const { error } = await supabase
            .from("todos")
            .update({
                text: value,
            })
            .eq("id", id)
            .eq("browser_id", getBrowserId());

        if (error) {
            console.error(error);
            return;
        }

        await loadTodos();
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

    async function clearTodos() {
        if (!confirm("チェックリストをすべて削除しますか？")) {
            return;
        }

        const { error } = await supabase
            .from("todos")
            .delete()
            .eq("browser_id", getBrowserId());

        if (error) {
            console.error(error);
            alert("削除に失敗しました。");
            return;
        }

        await loadTodos();
    }

    return {
        todos,
        loadTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        addTemplate,
        clearTodos,
    };
}

