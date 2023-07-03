import type { HTMLAttributes, ReactElement } from 'voby';
import { Grid } from "@react-md/utils";

export default function Container({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>): Child {
  return (
    <Grid {...props} clone padding={0} columns={1}>
      {children}
    </Grid>
  );
}
