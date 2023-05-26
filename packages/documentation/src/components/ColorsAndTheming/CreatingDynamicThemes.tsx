import type { ReactElement } from "react";

import { MarkdownPage } from "components/Markdown";

import readme from "./CreatingDynamicThemes.md";

export default function CreatingDynamicThemes(): Child {
  return <MarkdownPage>{readme}</MarkdownPage>;
}
