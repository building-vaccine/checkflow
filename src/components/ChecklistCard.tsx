import Link from "next/link";
import type { Checklist } from "@/data/checklists";

type Props = {
    checklist: Checklist;
    showCategory?: boolean;
};

export default function ChecklistCard({
    checklist,
    showCategory = false,
}: Props) {
    return (
        <Link
            href={`/checklists/${checklist.slug}`}
            className="block rounded-xl border border-slate-300 bg-white p-5 transition hover:border-blue-500 hover:shadow-lg"
        >
            {showCategory && (
                <p className="mb-2 text-xs font-semibold text-blue-600">
                    {checklist.category}
                </p>
            )}

            <h3 className="font-semibold text-slate-900">
                {checklist.emoji} {checklist.title}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
                {checklist.shortDescription}
            </p>

            <p className="mt-4 text-sm font-semibold text-blue-600">
                詳細を見る →
            </p>
        </Link>
    );
}