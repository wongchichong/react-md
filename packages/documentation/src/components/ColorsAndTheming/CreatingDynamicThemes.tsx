import type { ReactElement } from 'voby';

import { MarkdownPage } from "components/Markdown";

import readme from "./CreatingDynamicThemes.md";

export default function CreatingDynamicThemes(): Child {
  return <MarkdownPage>{readme}</MarkdownPage>;
}
