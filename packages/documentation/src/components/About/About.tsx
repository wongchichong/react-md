import type { ReactElement } from 'voby';

import { MarkdownPage } from "components/Markdown";

import readme from "./README.md";

export default function About(): Child {
  return <MarkdownPage>{readme}</MarkdownPage>;
}
