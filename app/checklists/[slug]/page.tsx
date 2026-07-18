import { checklists } from "@/src/data/checklists";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const checklist = checklists.find(
        (c) => c.slug === slug
    );

    if (!checklist) {
        return {
            title: "ページが見つかりません",
        };
    }

    return {
        title: checklist.seoTitle,
        description: checklist.seoDescription,

        openGraph: {
            title: checklist.seoTitle,
            description: checklist.seoDescription,
            url: `https://checkflow.vercel.app/checklists/${checklist.slug}`,
            siteName: "CheckFlow",
            images: [
                {
                    url: "/opengraph-image.png",
                    width: 1200,
                    height: 630,
                    alt: checklist.seoTitle,
                },
            ],
            locale: "ja_JP",
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: checklist.seoTitle,
            description: checklist.seoDescription,
            images: ["/opengraph-image.png"],
        },
    };
}

export default async function ChecklistPage({ params }: Props) {
    const { slug } = await params;

    const checklist = checklists.find(
        (c) => c.slug === slug
    );

    if (!checklist) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-slate-900">
                    {checklist.title}チェックリスト
                </h1>

                <p className="mt-6 leading-8 text-slate-700">
                    {checklist.shortDescription}
                </p>

                <div className="mt-8 rounded-xl border border-slate-300 bg-slate-50 p-6">
                    <ul className="space-y-2 text-slate-700">
                        {checklist.items.map((item) => (
                            <li key={item}>□ {item}</li>
                        ))}
                    </ul>
                </div>

                <Link
                    href={`/?add=${checklist.slug}`}
                    className="mt-4 inline-flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                    このテンプレートを使う
                </Link>
            </div>
        </main>
    );
}