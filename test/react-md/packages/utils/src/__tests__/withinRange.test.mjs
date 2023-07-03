import { withinRange } from "../withinRange.mjs";
describe("withinRange", () => {
  it("should return the value if the min or max values are undefined", () => {
    expect(withinRange(100, void 0, void 0)).toBe(100);
    expect(withinRange(0, void 0, void 0)).toBe(0);
    expect(withinRange(-100, void 0, void 0)).toBe(-100);
  });
  it("should return the correct value based on the min and max values", () => {
    expect(withinRange(0, 0, 10)).toBe(0);
    expect(withinRange(-1, 0, 10)).toBe(0);
    expect(withinRange(-1e-8, 0, 10)).toBe(0);
    expect(withinRange(20, 0, 20)).toBe(20);
    expect(withinRange(20, 0, 19)).toBe(19);
    expect(withinRange(10.5, 10, 11)).toBe(10.5);
    expect(withinRange(10.5, 9, 10)).toBe(10);
  });
});
