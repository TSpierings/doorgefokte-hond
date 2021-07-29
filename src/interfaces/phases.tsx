import { bodyIcons, bodyParts } from "./bodies";
import { furIcons, furParts } from "./furs";
import { headIcons, headOffsets, headParts } from "./heads";
import { legIcons, legOffsets, legParts } from "./legs";
import { tailIcons, tailParts, tailOffsets } from "./tails";

export const phases = [
  'Kop',
  'Romp',
  'Poten',
  'Staart',
  'Vacht',
  'Naam'
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
  tailParts,
  furParts
];

export const offsetsByPhase = [
  headOffsets,
  [], // Bodies don't get an offset
  legOffsets,
  tailOffsets
];
