import type { ReactElement } from 'voby';
import { $, useEffect } from 'voby';
import { Typography } from "@react-md/typography";

import { useFixedAppBarContext } from "components/Layout/fixedAppBarContext";

import Logo from "./Logo";
import styles from "./Banner.module.scss";

export default function Banner(): Child {
  const ref = $<HTMLDivElement | null>(null);
  const setElevation = useFixedAppBarContext();
  useEffect(() => {
    const banner = ref();
    const header = document.getElementById("layout-header");
    if (!banner || !header) {
      return;
    }

    const threshold = header.offsetHeight / banner.offsetHeight;

    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        setElevation(!isIntersecting);
      },
      {
        threshold,
      }
    );
    observer.observe(banner);

    return () => {
      observer.disconnect();
    };
  });
  return (
    <div ref={ref} className={styles.banner}>
      <Typography type="headline-2" className={styles.title}>
        react-md
      </Typography>
      <Logo className={styles.logo} />
    </div>
  );
}
