export const siteConfig = {
    name: "CheckFlow",

    url: "https://checkflowjp.vercel.app",

    description:
        "ログイン不要で使える無料のオンラインチェックリスト",

    locale: {
        og: "ja_JP",
        language: "ja-JP",
    },

    ogImage: "/opengraph-image.png",

    author: "building-vaccine",

    keywords: [
        "チェックリスト",
        "Todo",
        "タスク管理",
        "買い物リスト",
        "旅行チェックリスト",
    ],

    twitter: {
        card: "summary_large_image" as const,
    },
} as const;