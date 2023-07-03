import type { ReactElement, ReactNode } from 'voby';
import { $, useMemo } from 'voby';
import { useRouter } from "next/router";
import type { FilterFunction } from "@react-md/autocomplete";
import { AutoComplete } from "@react-md/autocomplete";
import { Button } from "@react-md/button";
import { Dialog } from "@react-md/dialog";
import { SearchSVGIcon } from "@react-md/material-icons";
import { 
 ABOVE_CENTER_ANCHOR, 
 caseInsensitiveFilter, 
 useAppSize,  } from "@react-md/utils";

import Code from "components/Code";
import type { 
 FormattedSassDocItem, 
 FormattedVariableItem,  } from "@react-md/dev-utils/src/utils";
import "@react-md/dev-utils/@types/sassdoc";

import getId from "./getId";
import getType from "./getType";

import styles from "./Find.module.scss";

interface FindProps {
  items: FormattedSassDocItem[];
}

export default function Find({ items }: FindProps): ReactElement | null {
  const router = useRouter();
  const visible = $(false);
  const searchables = useMemo(() =>
      items.map((item) => {
        const { name, packageName } = item;
        const type = getType(item.type);
        let secondaryText: ReactNode = item.type;
        if (type === "variable") {
          const { compiled, value } = item as FormattedVariableItem;
          const display = compiled || value;
          if (!/\r?\n/.test(display)) {
            secondaryText = <Code>{display}</Code>;
          }
        }

        return {
          name,
          to: getId(name, type, packageName),
          secondaryText,
        };
      }));

  const filter = ((query, data, options) => {
    const filtered = caseInsensitiveFilter(query, data, options);
    if (filtered.length) {
      return filtered;
    }

    return ["No matches..."];
  });
  const { isDesktop } = useAppSize();
  if (!isDesktop) {
    return null;
  }

  return (
    <>
      <Button
        id="sassdoc-find"
        aria-label="Find in page"
        onClick={() => visible(!visible)}
        buttonType="icon"
        theme="secondary"
        themeType="contained"
        floating="bottom-right"
      >
        <SearchSVGIcon />
      </Button>
      <Dialog
        id="sassdoc-autocomplete-dialog"
        aria-label="Search for SassDoc"
        visible={visible}
        onRequestClose={() => visible(false)}
        type="custom"
        className={styles.dialog}
      >
        <AutoComplete
          id="sassdoc-autocomplete"
          portal
          data={searchables}
          labelKey="name"
          valueKey="name"
          placeholder="Search..."
          filter={filter}
          listboxClassName={styles.listbox}
          clearOnAutoComplete
          onAutoComplete={(data) => {
            const result = data.result as typeof searchables[0];

            // the router.asPath seems to break while hot reloading
            const href = router.asPath.replace(/#.*$/, "");
            router.push(`${href}#${result.to}`);
            visible(false);
          }}
          anchor={ABOVE_CENTER_ANCHOR}
          yMargin={12}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.preventDefault();
            }
          }}
        />
      </Dialog>
    </>
  );
}
