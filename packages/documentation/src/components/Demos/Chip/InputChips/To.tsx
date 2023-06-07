import type { ReactElement } from 'voby';
import { $, useEffect, useMemo } from 'voby';
import type { 
 AutoCompleteHandler, 
 AutoCompleteData,  } from "@react-md/autocomplete";
import { AutoComplete } from "@react-md/autocomplete";
import { Avatar } from "@react-md/avatar";
import { Chip } from "@react-md/chip";
import { Label } from "@react-md/form";
import { AddCircleSVGIcon } from "@react-md/material-icons";
import { BELOW_INNER_LEFT_ANCHOR } from "@react-md/utils";

import type { Contact } from "./contacts";
import contacts from "./contacts";
import styles from "./To.module.scss";

export default function To(): Child {
  const chips = $<Contact[]>([]);
  const data = useMemo<(AutoCompleteData & { label: string })[]>(() =>
      contacts
        .filter(({ id }) => !chips().find((chip) => chip.id === id))
        .map(({ name, avatar, email }) => ({
          label: name,
          leftAddon: (
            <Avatar>
              <img src={avatar} alt="" />
            </Avatar>
          ),
          leftAddonType: "avatar",
          secondaryText: email,
        })));

  const onAutoComplete = ((result) => {
    const item = result.result as typeof data[0];
    const contact = contacts.find(({ name }) => item.label === name);
    if (!contact) {
      throw new Error();
    }
    chips((prevChips) => [...prevChips, contact]);
  });

  const emailsRef = $<HTMLDivElement | null>(null);
  useEffect(() => {
    const div = emailsRef();
    if (div) {
      div.scrollLeft = div.scrollWidth;
    }
  });
  return (
    <div className={styles.container}>
      <Label htmlFor="input-chips-email" className={styles.spacing}>
        To
      </Label>
      <div className={styles.emails} ref={emailsRef}>
        {chips.map(({ id, name, avatar }) => (
          <Chip
            key={id}
            leftIcon={
              <Avatar>
                <img src={avatar} alt="" />
              </Avatar>
            }
            rightIcon={<AddCircleSVGIcon className={styles.rotate} />}
            className={styles.spacing}
            onClick={() =>
              chips((prevChips) =>
                prevChips.filter((chip) => chip.id !== id)
              )
            }
          >
            {name}
          </Chip>
        ))}
        <AutoComplete
          id="input-chips-email"
          placeholder="Email"
          valueKey="label"
          data={data}
          listboxWidth="auto"
          anchor={BELOW_INNER_LEFT_ANCHOR}
          className={styles.email}
          inline
          highlight
          clearOnAutoComplete
          onAutoComplete={onAutoComplete}
          vhMargin={0}
          vwMargin={0}
          disableSwapping
          listboxClassName={styles.listbox}
        />
      </div>
    </div>
  );
}
