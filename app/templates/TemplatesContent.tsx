"use client";

import { useState } from "react";
import ChecklistCard from "@/src/components/ChecklistCard";
import type { Checklist } from "@/src/data/checklists";

type Category = {
    id: string;
    name: string;
    emoji: string;
    items: Checklist[];
};

type Props = {
    categories: Category[];
};

export default function TemplatesContent({ categories }: Props) {
    const [opened, setOpened] = useState(() =>
        Object.fromEntries(
            categories.map((category) => [category.id, false])
        ) as Record<string, boolean>
    );

    const [search, setSearch] = useState("");

    const matchesSearch = (checklist: Checklist) => {
        if (!search) return true;

        const keyword = search.toLowerCase();

        return (
            checklist.title.toLowerCase().includes(keyword) ||
            checklist.shortDescription.toLowerCase().includes(keyword) ||
            checklist.items.some((item) =>
                item.toLowerCase().includes(keyword)
            )
        );
    };

    const resultCount = categories.reduce(
        (count, category) => count + category.items.filter(matchesSearch).length,
        0
    );

    return (
        <div className="mt-8 space-y-12">
            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="テンプレートを検索..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label="検索をクリア"
                    >
                        ✕
                    </button>
                )}
            </div>

            {search && (
                <p className="mt-3 text-sm text-slate-600">
                    「{search}」の検索結果：{resultCount}件
                </p>
            )}

            {categories.map((category) => {
                const filteredItems = category.items.filter(matchesSearch);

                if (filteredItems.length === 0) {
                    return null;
                }

                return (
                    <section key={category.id}>
                        <button
                            type="button"
                            onClick={() =>
                                setOpened((prev) => ({
                                    ...prev,
                                    [category.id]: !prev[category.id],
                                }))
                            }
                            className="mb-4 flex w-full items-center justify-between rounded-lg p-2 text-left transition hover:bg-slate-200"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg">
                                    {(search || opened[category.id]) ? "▼" : "▶"}
                                </span>

                                <span className="text-2xl font-bold text-slate-900">
                                    {category.emoji} {category.name}
                                </span>
                            </div>

                            <span className="text-base font-medium text-slate-500">
                                {filteredItems.length}件
                            </span>
                        </button>

                        {(search || opened[category.id]) && (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredItems.map((checklist) => (
                                    <ChecklistCard
                                        key={checklist.slug}
                                        checklist={checklist}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                );
            })}
        </div>
    );
}