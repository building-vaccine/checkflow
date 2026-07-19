import { checklists } from "@/src/data/checklists";
import { shuffle } from "@/src/lib/shuffle";
import Faq from "@/src/components/Faq";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";

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

    const checklist = checklists.find((c) => c.slug === slug);

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
            url: `${siteConfig.url}/checklists/${checklist.slug}`,
            siteName: siteConfig.name,
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: checklist.seoTitle,
                },
            ],
            locale: siteConfig.locale.og,
            type: "website",
        },

        twitter: {
            card: siteConfig.twitter.card,
            title: checklist.seoTitle,
            description: checklist.seoDescription,
            images: [siteConfig.ogImage],
        },
    };
}

export default async function ChecklistPage({ params }: Props) {
    const { slug } = await params;

    const checklist = checklists.find((c) => c.slug === slug);

    if (!checklist) {
        notFound();
    }

    const candidates = checklists.filter(
        (c) =>
            c.category === checklist.category &&
            c.slug !== checklist.slug
    );

    const featured = candidates.filter(
        (c) => c.featured
    );

    const others = shuffle(
        candidates.filter((c) => !c.featured)
    );

    const relatedChecklists = [
        ...featured,
        ...others,
    ].slice(0, 4);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                item: {
                                    "@id": siteConfig.url,
                                    name: "ホーム",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                item: {
                                    "@id": `${siteConfig.url}/templates`,
                                    name: "テンプレート一覧",
                                },
                            },
                            {
                                "@type": "ListItem",
                                position: 3,
                                item: {
                                    "@id": `${siteConfig.url}/checklists/${checklist.slug}`,
                                    name: `${checklist.title}チェックリスト`,
                                },
                            },
                        ],
                    }),
                }}
            />

            <main className="min-h-screen bg-slate-100 px-6 py-12">
                <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

                    <h1 className="text-3xl font-bold text-slate-900">
                        {checklist.title}チェックリスト
                    </h1>

                    <p className="mt-4 text-lg text-slate-600">
                        {checklist.shortDescription}
                    </p>

                    <Link
                        href={`/?add=${checklist.slug}`}
                        className="mt-8 inline-flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        このテンプレートを使う
                    </Link>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-slate-900">
                            このチェックリストについて
                        </h2>

                        <p className="mt-3 leading-8 text-slate-700">
                            {checklist.overview}
                        </p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-slate-900">
                            こんな方におすすめ
                        </h2>

                        <ul className="mt-4 space-y-2">
                            {checklist.recommendedFor.map((item) => (
                                <li key={item} className="text-slate-700">
                                    ✓ {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-slate-900">
                            よく忘れがちなもの
                        </h2>

                        <ul className="mt-4 space-y-2">
                            {checklist.commonMistakes.map((item) => (
                                <li key={item} className="text-slate-700">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold text-slate-900">
                            チェック項目
                        </h2>

                        <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-6">
                            <ul className="space-y-2 text-slate-700">
                                {checklist.items.map((item) => (
                                    <li key={item}>□ {item}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <Link
                        href={`/?add=${checklist.slug}`}
                        className="mt-10 inline-flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        このテンプレートを使う
                    </Link>

                    {relatedChecklists.length > 0 && (
                        <section className="mt-12 border-t border-slate-200 pt-10">
                            <h2 className="text-2xl font-bold text-slate-900">
                                関連テンプレート
                            </h2>

                            <p className="mt-2 text-slate-600">
                                あわせて使われることが多いチェックリストです。
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                {relatedChecklists.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={`/checklists/${item.slug}`}
                                        className="rounded-xl border border-slate-300 bg-white p-5 transition hover:border-blue-500 hover:shadow-md"
                                    >
                                        <div className="text-3xl">{item.emoji}</div>

                                        <h3 className="mt-3 font-semibold text-slate-900">
                                            {item.title}チェックリスト
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-600">
                                            {item.shortDescription}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <Faq />
                </div>
            </main>
        </>
    );
}