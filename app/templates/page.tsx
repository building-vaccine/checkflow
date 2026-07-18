import Link from "next/link";
import { checklists } from "@/src/data/checklists";
import ChecklistCard from "@/src/components/ChecklistCard";
import { categories } from "@/src/data/checklists/categories";

export const metadata = {
    title: "テンプレート一覧",
    description: "用途別の無料チェックリストテンプレート一覧です。",
};

export default function TemplatesPage() {

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-900">
                    テンプレート一覧
                </h1>

                <p className="mt-3 text-slate-600">
                    用途に合わせてチェックリストを選べます。
                </p>

                <div className="mt-8 space-y-12">
                    {categories.map((category) => (
                        <section key={category.id}>
                            <h2 className="mb-4 text-2xl font-bold text-slate-900">
                                {category.emoji} {category.name}
                            </h2>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {checklists
                                    .filter((c) => c.category === category.id)
                                    .map((checklist) => (
                                        <ChecklistCard
                                            key={checklist.slug}
                                            checklist={checklist}
                                        />
                                    ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}