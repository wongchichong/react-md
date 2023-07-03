import type { ReactElement } from 'voby';
import { $, useEffect } from 'voby';
import { Button } from "@react-md/button";
import { Checkbox, Form, Select } from "@react-md/form";
import { Typography } from "@react-md/typography";
import type { ContrastRatioCompliance, HexString } from "@react-md/utils";
import { Grid, GridCell } from "@react-md/utils";

import type { 
 ColorAccent, 
 PrimaryColor, 
 SecondaryColor, 
 ThemeMode,  } from "components/Theme";
import { primaries, secondaries, useThemeActions } from "components/Theme";
import BackgroundWarnings from "./BackgroundWarnings";
import ConfigurationCell from "./ConfigurationCell";
import useThemeVariables from "./useThemeVariables";
import { getAccents, getOptionLabel, getOptions } from "./utils";

const baseSelectProps = {
  labelKey: "name",
  valueKey: "name",
  getOptionLabel,
  getDisplayLabel: getOptionLabel,
};

interface ThemeConfigurationProps {
  primary: PrimaryColor;
  secondary: SecondaryColor;
  accent: ColorAccent;
  theme: ThemeMode;
  primaryColor: HexString;
  secondaryColor: HexString;
}

const compliances = [
  {
    name: "large",
    label: "large (3:1)",
  },
  {
    name: "normal",
    label: "normal (4.5:1)",
  },
  {
    name: "AAA",
    label: "AAA (7:1)",
  },
];

export default function ThemeConfiguration({
  primary,
  secondary,
  accent,
  theme,
  primaryColor,
  secondaryColor,
}: ThemeConfigurationProps): Child {
  const { setPrimary, setSecondary, setAccent, toggleTheme, reset } =
    useThemeActions();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => reset());
  const variables = useThemeVariables(primaryColor, secondaryColor);
  const compliance = $<ContrastRatioCompliance>("large");
  const handleComplianceChange = ((compliance()) =>
      compliance(compliance() as ContrastRatioCompliance),
    []
  );

  const resetAll = (() => {
    reset();
    compliance("large");
  });

  useEffect(() => {
    const { style } = document.documentElement;
    variables.forEach((variable) => {
      style.setProperty(variable.name, `${variable.value}`);
    });

    return () => {
      variables.forEach((variable) => {
        style.setProperty(variable.name, "");
      });
    };
  });

  return (
    <GridCell clone>
      <Form>
        <Grid columns={1} tabletColumns={2} largeDesktopColumns={3}>
          <ConfigurationCell fullWidth>
            <Typography type="headline-4" margin="bottom">
              Configuration
            </Typography>
          </ConfigurationCell>
          <ConfigurationCell>
            <Select
              {...baseSelectProps}
              id="primary-color"
              label="Primary color"
              value={primary}
              onChange={setPrimary}
              options={getOptions(primaries, secondary, true)}
            />
          </ConfigurationCell>
          <ConfigurationCell>
            <Select
              {...baseSelectProps}
              id="secondary-color"
              label="Secondary color"
              value={secondary}
              onChange={setSecondary}
              options={getOptions(secondaries, primary, false)}
            />
          </ConfigurationCell>
          <ConfigurationCell>
            <Select
              {...baseSelectProps}
              id="accent-hue"
              label="Accent hue"
              value={`${accent}`}
              onChange={setAccent}
              options={getAccents(secondary)}
            />
          </ConfigurationCell>
          <ConfigurationCell>
            <Select
              {...baseSelectProps}
              id="wcag-compliance-level"
              label="Compliance Level"
              value={compliance}
              onChange={handleComplianceChange}
              options={compliances}
            />
          </ConfigurationCell>
          <ConfigurationCell fullWidth>
            <Checkbox
              id="toggle-theme-checkbox"
              label="Enable dark theme"
              name="theme"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
          </ConfigurationCell>
          <ConfigurationCell fullWidth>
            <BackgroundWarnings
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              isDark={theme === "dark"}
              compliance={compliance}
            />
          </ConfigurationCell>
        </Grid>
        <Button
          type="submit"
          theme="secondary"
          onClick={resetAll}
          themeType="contained"
        >
          Reset
        </Button>
      </Form>
    </GridCell>
  );
}
