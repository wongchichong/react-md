import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { Typography } from "@react-md/typography";

export default forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Page1(props, ref) {
    return (
      <div {...props} ref={ref}>
        <Typography type="headline-4">Page 1</Typography>
        <Typography>
          Nunc dapibus nec neque vitae aliquam. Phasellus eu luctus tortor.
          Morbi et massa lectus. Nam nec posuere urna, nec tincidunt ligula.
          Vestibulum in urna dapibus, rutrum nisi eu, convallis leo. Morbi
          maximus ultricies metus at venenatis. Nulla tincidunt in enim ac
          semper. Maecenas at felis eget dui malesuada placerat eu a dui.
          Vestibulum vel quam egestas turpis commodo euismod ac quis purus.
        </Typography>
      </div>
    );
  }
);
