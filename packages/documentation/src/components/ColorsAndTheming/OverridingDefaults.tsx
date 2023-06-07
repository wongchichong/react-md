import type { ReactElement } from 'voby';

import { MarkdownPage } from "components/Markdown";

import readme from "./OverridingDefaults.md";

export default function OverridingDefaults(): Child {
  return <MarkdownPage>{readme}</MarkdownPage>;
}
