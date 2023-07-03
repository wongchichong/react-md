import type { ReactElement } from 'voby';
import { Button } from "@react-md/button";
import { FontIcon } from "@react-md/icon";
import { DeleteSVGIcon, FavoriteSVGIcon } from "@react-md/material-icons";

import Container from "./Container";

export default function IconButtons(): Child {
  return (
    <Container>
      <Button
        id="icon-button-1"
        buttonType="icon"
        theme="primary"
        aria-label="Favorite"
      >
        <FontIcon>favorite</FontIcon>
      </Button>
      <Button
        id="icon-button-2"
        buttonType="icon"
        theme="secondary"
        aria-label="Favorite"
      >
        <FavoriteSVGIcon />
      </Button>
      <Button
        id="icon-button-3"
        buttonType="icon"
        theme="warning"
        aria-label="Move to Trash"
      >
        <DeleteSVGIcon />
      </Button>
      <Button
        id="icon-button-4"
        buttonType="icon"
        theme="error"
        aria-label="Permanently Delete"
      >
        <DeleteSVGIcon />
      </Button>
      <Button
        id="icon-button-5"
        buttonType="icon"
        theme="clear"
        aria-label="Add"
      >
        <FontIcon>add</FontIcon>
      </Button>
      <Button
        id="icon-button-6"
        buttonType="icon"
        disabled
        aria-label="Disabled Add Button"
      >
        <FontIcon>add</FontIcon>
      </Button>
      <Button
        id="icon-button-7"
        buttonType="icon"
        theme="primary"
        themeType="outline"
        aria-label="Favorite"
      >
        <FontIcon>favorite</FontIcon>
      </Button>
      <Button
        id="icon-button-8"
        buttonType="icon"
        theme="secondary"
        themeType="outline"
        aria-label="Favorite"
      >
        <FavoriteSVGIcon />
      </Button>
      <Button
        id="icon-button-9"
        buttonType="icon"
        theme="warning"
        themeType="contained"
        aria-label="Move to Trash"
      >
        <DeleteSVGIcon />
      </Button>
      <Button
        id="icon-button-10"
        buttonType="icon"
        theme="error"
        themeType="contained"
        aria-label="Permanently Delete"
      >
        <DeleteSVGIcon />
      </Button>
      <Button
        id="icon-button-11"
        buttonType="icon"
        theme="clear"
        themeType="outline"
        aria-label="Add"
      >
        <FontIcon>add</FontIcon>
      </Button>
      <Button
        id="icon-button-12"
        buttonType="icon"
        disabled
        aria-label="Disabled Add Button"
        themeType="outline"
      >
        <FontIcon>add</FontIcon>
      </Button>
    </Container>
  );
}
