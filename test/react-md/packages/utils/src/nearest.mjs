function nearest(value, min, max, steps, range = max - min) {
  const rounded = Math.round((value - min) * steps / range) / steps;
  const zeroToOne = Math.min(Math.max(rounded, 0), 1);
  const step = range / steps;
  const decimals = Number.isInteger(step) ? range % steps : step.toString().split(".")[1].length;
  return Math.min(
    max,
    Math.max(min, parseFloat((zeroToOne * range + min).toFixed(decimals)))
  );
}
export {
  nearest
};
