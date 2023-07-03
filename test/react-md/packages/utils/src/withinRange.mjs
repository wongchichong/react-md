function withinRange(value, min, max) {
  let nextValue = value;
  if (typeof min === "number") {
    nextValue = Math.max(min, nextValue);
  }
  if (typeof max === "number") {
    nextValue = Math.min(max, nextValue);
  }
  return nextValue;
}
export {
  withinRange
};
