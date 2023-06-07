import type { ReactElement } from 'voby';
import { Typography } from "@react-md/typography";

import Link from "components/Link";
import type { FormattedItemLink, ItemReferenceLink } from "@react-md/dev-utils/src/utils/";
import "@react-md/dev-utils/@types/sassdoc";

import ReferenceLinkList from "./ReferenceLinkList";

export interface LinksProps {
  links: FormattedItemLink[] | undefined;
  see: ItemReferenceLink[] | undefined;
}

export default function Links({
  links = [],
  see = [],
}: LinksProps): ReactElement | null {
  if (!links.length && !see.length) {
    return null;
  }

  return (
    <>
      <Typography type="headline-6" margin="top">
        See also
      </Typography>
      <ul>
        {links.map(({ name, href }) => (
          <li key={href}>
            <Link href={href}>{name || href}</Link>
          </li>
        ))}
        <ReferenceLinkList links={see} />
      </ul>
    </>
  );
}
