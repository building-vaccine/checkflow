import { lifeChecklists } from "./life";
import { travelChecklists } from "./travel";
import { workChecklists } from "./work";
import { healthChecklists } from "./health";
import { disasterChecklists } from "./disaster";

export type { Checklist } from "./types";

export const checklists = [
    ...lifeChecklists,
    ...travelChecklists,
    ...workChecklists,
    ...healthChecklists,
    ...disasterChecklists,
];