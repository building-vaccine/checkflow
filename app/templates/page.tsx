import { checklistCategories } from "@/src/data/checklists";
import TemplatesContent from "./TemplatesContent";
import { siteConfig } from "@/src/config/site";

export const metadata = {
    title: "テンプレート一覧",
    description: "用途別の無料チェックリストテンプレート一覧です。",
};

export default function TemplatesPage() {
    const itemListElement = checklistCategories
        .flatMap((category) => category.items)
        .map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "WebPage",
                name: `${item.title}チェックリスト`,
                url: `${siteConfig.url}/checklists/${item.slug}`,
            },
        }));

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        name: "CheckFlow テンプレート一覧",
                        itemListOrder: "https://schema.org/ItemListOrderAscending",
                        numberOfItems: itemListElement.length,
                        itemListElement,
                    }),
                }}
            />

            <main className="min-h-screen bg-slate-100 px-6 py-12">
                <div className="mx-auto max-w-5xl">
                    <h1 className="text-3xl font-bold text-slate-900">
                        テンプレート一覧
                    </h1>

                    <p className="mt-3 text-slate-600">
                        用途に合わせてチェックリストを選べます。
                    </p>

                    <TemplatesContent
                        categories={checklistCategories}
                    />
                </div>
            </main>
        </>
    );
}