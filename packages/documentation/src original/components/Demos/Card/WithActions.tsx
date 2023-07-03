import type { ReactElement } from "react";
import { Button } from "@react-md/button";
import {
  Card,
  CardTitle,
  CardContent,
  CardActions,
  CardHeader,
} from "@react-md/card";
import { Typography } from "@react-md/typography";
import Container from "./Container";

export default function WithActions(): Child {
  return (
    <Container>
      <Card raisable>
        <CardHeader>
          <CardTitle>This is a title</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography>
            Sed molestie finibus varius. Maecenas tincidunt eu quam eget
            sodales. Fusce ut lacus luctus, aliquam erat eu, fringilla libero.
            Nulla rhoncus mi nec orci ultricies ultricies. Aenean et hendrerit
            velit. Curabitur condimentum a tortor sit amet porttitor. Sed ut
            neque eget massa feugiat ullamcorper. Sed quis vulputate mi,
            imperdiet egestas diam. Nullam rutrum nisl sed mi posuere commodo.
            Nulla eleifend interdum euismod. Suspendisse sit amet rutrum lorem,
            nec aliquet tellus. Nam non massa imperdiet, vehicula diam nec,
            efficitur turpis. In non suscipit tellus. Vivamus ac volutpat velit,
            sit amet faucibus nisi. Pellentesque condimentum dignissim augue,
            sit amet porta ipsum feugiat nec.
          </Typography>
        </CardContent>
        <CardActions>
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
