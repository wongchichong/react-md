import type { FormattedSassDocItem } from "@react-md/dev-utils/src/utils/";
import "@react-md/dev-utils/@types/sassdoc";

export default function getType(
  type: FormattedSassDocItem["type"]
): "function" | "mixin" | "variable" {
  return type !== "mixin" && type !== "function" ? "variable" : type;
}
