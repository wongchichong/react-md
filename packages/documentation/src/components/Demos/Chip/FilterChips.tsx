import type { ReactElement } from 'voby';
import { $ } from 'voby';
import { Chip } from "@react-md/chip";
import { Typography } from "@react-md/typography";

import styles from "./FilterChips.module.scss";

const amenities = [
  "Elevator",
  "Washer / Dryer",
  "Fireplace",
  "Wheelchair Access",
  "Dogs ok",
  "Cats ok",
];

export default function FilterChips(): Child {
  const selectedAmenities = $<string[]>([]);
  return (
    <>
      <Typography type="headline-5" className={styles.header}>
        Choose amenities
      </Typography>
      <div className={styles.container}>
        {amenities.map((amenity) => {
          const selected = selectedAmenities.includes(amenity);

          return (
            <Chip
              key={amenity}
              selected={selected}
              className={styles.chip}
              onClick={() =>
                selectedAmenities((prevSelected) => {
                  if (prevSelected.includes(amenity)) {
                    return prevSelected.filter((am) => am !== amenity);
                  }

                  return [...prevSelected, amenity];
                })
              }
            >
              {amenity}
            </Chip>
          );
        })}
      </div>
    </>
  );
}
