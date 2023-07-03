import type { ReactElement } from 'voby';
import { $ } from 'voby';
import { UnstyledButton } from "@react-md/button";
import { Collapse } from "@react-md/transition";

import CodeBlock from "components/CodeBlock";

import styles from "./ExpandableCode.module.scss";

export interface ExpandableCodeProps {
  code: string;
  sourceCode: string;
}

export default function ExpandableCode({
  code,
  sourceCode,
}: ExpandableCodeProps): Child {
  const collapsed = $(true);
  const currentCode = $(code);

  return (
    <UnstyledButton
      aria-label="Source code"
      aria-pressed={!collapsed}
      onClick={() => {
        collapsed(!collapsed);
        currentCode(sourceCode);
      }}
      className={styles.container}
    >
      <Collapse
        collapsed={collapsed}
        minHeight={56}
        minPaddingTop={16}
        minPaddingBottom={16}
        onExited={() => currentCode(code)}
      >
        <CodeBlock language="scss">{currentCode}</CodeBlock>
      </Collapse>
    </UnstyledButton>
  );
}
