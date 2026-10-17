/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Hotspot {
  id: string;
  name: string;
  description: string;
  x?: number; // percentage coordinate on right-side illustration (e.g. 25 for 25% from left)
  y?: number; // percentage coordinate on right-side illustration (e.g. 40 for 40% from top)
}

export interface BookPage {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  image: string;
  hotspots: Hotspot[];
  isTimelineComponent?: boolean; // if true, render the interactive kingship timeline component
  isExpansionMap?: boolean; // if true, render the interactive Viking expansion map of Europe
  isFigureGraph?: boolean; // if true, render the key-figures relationship graph
  isDietOverview?: boolean; // if true, render the diet changes & common foods overview
  isArchOverview?: boolean; // if true, render the architecture changes & diagram overview
}

export interface Chapter {
  id: string;
  gothicTitle: string;
  englishTitle: string;
  runicSubtitle: string;
  era: string;
  summary: string;
  paragraphs: string[]; // references page 1 paragraphs for fallback / admin usage
  defaultImage: string; // references page 1 image
  hotspots: Hotspot[];  // references page 1 hotspots
  coverImage?: string;  // optional chapter cover/frontispiece image (shown on chapter landing page)
  pages: BookPage[];
}

export interface Message {
  id: string;
  sender: "user" | "scribe";
  text: string;
  timestamp: string;
}

export type RoleplayPerspective = "monk" | "scald" | "royal";

export interface CustomIllustration {
  chapterId: string;
  imageUrl: string;
  type: "default" | "uploaded" | "url" | "generated";
  promptUsed?: string;
}
