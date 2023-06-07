import type { ReactElement } from 'voby';
import { $ } from 'voby';
import type { AutoCompleteHandler } from "@react-md/autocomplete";
import { AutoComplete } from "@react-md/autocomplete";
import { 
 AppBarNav, 
 AppBar, 
 AppBarAction, 
 AppBarTitle,  } from "@react-md/app-bar";
import { SearchSVGIcon, KeyboardVoiceSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { PhoneOnly, useAppSize } from "@react-md/utils";

import type { Dessert } from "constants/desserts";
import dessertList from "constants/desserts";
import Phone, { PhoneAppBar, ClosePhone } from "components/Phone";

import DessertTable from "./DessertTable";
import styles from "./HighlightMatches.module.scss";

const desserts = dessertList.map(({ name }) => name);

export default function HighlightMatches(): Child {
  const dessert = $<Dessert | null>(null);
  const onAutoComplete = (({ dataIndex }) => {
    dessert(dessertList[dataIndex]);
  });

  const { isPhone } = useAppSize();

  return (
    <Phone
      id="highlight-example"
      onPhoneClose={() => dessert(null)}
      disableAppBar
      disableContent={isPhone}
      contentClassName={styles.container}
      appBar={
        <PhoneAppBar>
          <AppBar>
            <AppBarNav id="phone-nav">
              <SearchSVGIcon />
            </AppBarNav>
            <AppBarTitle>
              <AutoComplete
                id="phone-search"
                placeholder="Search"
                data={desserts}
                onAutoComplete={onAutoComplete}
                highlight
                theme="none"
                listboxWidth="auto"
                listboxClassName={styles.listbox}
                vhMargin={0}
                vwMargin={0}
                clearOnAutoComplete
              />
            </AppBarTitle>
            <AppBarAction id="phone-action" first last>
              <KeyboardVoiceSVGIcon />
            </AppBarAction>
          </AppBar>
        </PhoneAppBar>
      }
    >
      <Typography type="headline-6" style={{ margin: "1rem" }}>
        {dessert ? "Nutrition" : "No Dessert Chosen"}
      </Typography>
      <DessertTable dessert={dessert} />
      <PhoneOnly>
        <ClosePhone id="phone-close" floating />
      </PhoneOnly>
    </Phone>
  );
}
