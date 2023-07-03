import type { ReactElement } from "react";
import { Button } from "@react-md/button";

import Container from "./Container";

export default function TextButtons(): Child {
  return (
    <Container>
      <Button id="text-button-1" theme="primary">
        Text Button 1
      </Button>
      <Button id="text-button-2" theme="secondary">
        Text Button 2
      </Button>
      <Button id="text-button-3" theme="warning">
        Text Button 3
      </Button>
      <Button id="text-button-4" theme="error">
        Text Button 4
      </Button>
      <Button id="text-button-5" theme="clear">
        Text Button 5
      </Button>
      <Button id="text-button-6" disabled>
        Disabled Text Button
      </Button>
    </Container>
  );
}
