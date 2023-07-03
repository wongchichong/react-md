function omit(object, omitKeys) {
  if (!omitKeys.length) {
    return object;
  }
  const result = {};
  for (const key in object) {
    if (!omitKeys.includes(key)) {
      result[key] = object[key];
    }
  }
  return result;
}
export {
  omit
};
