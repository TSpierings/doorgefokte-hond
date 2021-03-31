import { bodyIcons, bodyParts } from "./bodies";
import { furIcons } from "./furs";
import { headIcons, headParts } from "./heads";
import { legIcons, legParts } from "./legs";
import { tailIcons, tailParts } from "./tails";

export const phases = [
  'Kop',
  'Romp',
  'Poten',
  'Staart',
  'Vacht'
];

export const iconsByPhase = [
  headIcons,
  bodyIcons,
  legIcons,
  tailIcons,
  furIcons
];

export const partsByPhase = [
  headParts,
  bodyParts,
  legParts,
  tailParts
];
