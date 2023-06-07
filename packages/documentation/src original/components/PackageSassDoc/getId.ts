//@ts-nocheck
import type { Item } from "@react-md/dev-utils/@types/sassdoc";

type ItemType = Item["context"]["type"];

export default function getId(
  name: string,
  type: ItemType,
  packageName: string
): string {
  return `${packageName}-${type}-${name}`;
}
