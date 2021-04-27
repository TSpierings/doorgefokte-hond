import { bodyIcons, bodyParts } from "./bodies";
import { furIcons } from "./furs";
import { headIcons, headOffsets, headParts } from "./heads";
import { legIcons, legOffsets, legParts } from "./legs";
import { tailIcons, tailParts, tailOffsets } from "./tails";

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

export const offsetsByPhase = [
  headOffsets,
  [], // Bodies don't get an offset
  legOffsets,
  tailOffsets
];
