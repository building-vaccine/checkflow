import { categories } from "./categories";
import { lifeChecklists } from "./life";
import { travelChecklists } from "./travel";
import { workChecklists } from "./work";
import { healthChecklists } from "./health";
import { disasterChecklists } from "./disaster";

export type { Checklist } from "./types";

export const checklistCategories = [
    {
        ...categories.find((c) => c.id === "life")!,
        items: lifeChecklists,
    },
    {
        ...categories.find((c) => c.id === "travel")!,
        items: travelChecklists,
    },
    {
        ...categories.find((c) => c.id === "work")!,
        items: workChecklists,
    },
    {
        ...categories.find((c) => c.id === "health")!,
        items: healthChecklists,
    },
    {
        ...categories.find((c) => c.id === "disaster")!,
        items: disasterChecklists,
    },
];

export const checklists = checklistCategories.flatMap(
    (category) => category.items
);