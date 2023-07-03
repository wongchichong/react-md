function getPercentage({
  min,
  max,
  value,
  validate = true
}) {
  if (validate) {
    if (min >= max) {
      throw new RangeError(
        "A range must have the min value less than the max value"
      );
    }
    if (value > max || value < min) {
      throw new RangeError("A value must be between the min and max values");
    }
  }
  const range = max - min;
  const start = value - min;
  const percentage = start / range;
  return Math.max(0, Math.min(Math.abs(percentage), 1));
}
export {
  getPercentage
};
