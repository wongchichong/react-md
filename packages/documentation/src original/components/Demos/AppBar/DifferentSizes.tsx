import type { ReactElement } from "react";
import { AppBar, AppBarAction, AppBarNav } from "@react-md/app-bar";
import { TextIconSpacing } from "@react-md/icon";
import {
  ArrowDropDownSVGIcon,
  MenuSVGIcon,
  MoreVertSVGIcon,
  SearchSVGIcon,
} from "@react-md/material-icons";

import AppBarTitle from "components/AppBarTitle";

import Container from "./Container";

function DenseAppBar(): Child {
  return (
    <AppBar height="dense">
      <AppBarNav aria-label="Navigation" id="dense-nav">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Dense</AppBarTitle>
      <AppBarAction first aria-label="Search" id="dense-search">
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction last aria-label="Actions" id="dense-actions">
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
  );
}

function NormalAppBar(): Child {
  return (
    // or add height="normal"
    <AppBar>
      <AppBarNav aria-label="Navigation" id="normal-nav">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Dense Prominent</AppBarTitle>
      <AppBarAction first aria-label="Search" id="normal-search">
        <SearchSVGIcon />
      </AppBarAction>
      <AppBarAction last aria-label="Actions" id="normal-actions">
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
  );
}

function DenseProminentAppBar(): Child {
  return (
    <AppBar height="prominent-dense">
      <AppBar height="dense">
        <AppBarNav aria-label="Navigation" id="dense-prominent-nav">
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarTitle>Dense</AppBarTitle>
        <AppBarAction first aria-label="Search" id="dense-prominent-search">
          <SearchSVGIcon />
        </AppBarAction>
        <AppBarAction last aria-label="Actions" id="dense-prominent-actions">
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBar>
      <AppBar height="dense">
        <AppBarTitle keyline>And Prominent!</AppBarTitle>
        <AppBarAction first buttonType="text" id="dense-prominent-new">
          <TextIconSpacing icon={<ArrowDropDownSVGIcon />} iconAfter>
            New...
          </TextIconSpacing>
        </AppBarAction>
      </AppBar>
    </AppBar>
  );
}

function ProminentAppBar(): Child {
  return (
    <AppBar height="prominent">
      <AppBar>
        <AppBarNav aria-label="Navigation">
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarAction first aria-label="Search">
          <SearchSVGIcon />
        </AppBarAction>
        <AppBarAction last aria-label="Actions" id="prominent-actions">
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBar>
      <AppBar>
        <AppBarTitle keyline>Only Prominent</AppBarTitle>
        <AppBarAction first buttonType="text" id="prominent-new">
          <TextIconSpacing icon={<ArrowDropDownSVGIcon />} iconAfter>
            New...
          </TextIconSpacing>
        </AppBarAction>
      </AppBar>
    </AppBar>
  );
}

export default function DifferentSizes(): Child {
  return (
    <Container>
      <DenseAppBar />
      <NormalAppBar />
      <DenseProminentAppBar />
      <ProminentAppBar />
    </Container>
  );
}
