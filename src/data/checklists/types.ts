export type Checklist = {
    slug: string;
    category: string;
    emoji: string;

    title: string;
    shortDescription: string;

    seoTitle: string;
    seoDescription: string;

    featured: boolean;

    overview: string;
    recommendedFor: string[];
    commonMistakes: string[];

    items: string[];
};