import { Laboratory } from "../src/Laboratory";

describe("Laboratory initialization", () => {
  it("returns 0 for a known substance", () => {
    const lab = new Laboratory(["water"]);

    expect(lab.getQuantity("water")).toBe(0);
  });

  it("throws for an unknown substance", () => {
    const lab = new Laboratory(["water"]);

    expect(() => lab.getQuantity("salt")).toThrow("Unknown substance: salt");
  });

  it("throws when initialized with duplicate substances", () => {
    expect(() => new Laboratory(["water", "water"])).toThrow(
      "Duplicate substance: water"
    );
  });

  it("throws when initialized with an empty substance name", () => {
    expect(() => new Laboratory([""])).toThrow('Invalid substance: ""');
  });

  it("throws when initialized with a whitespace-only substance", () => {
    expect(() => new Laboratory(["   "])).toThrow('Invalid substance: "   "');
  });

  it("throws when initialized with an empty list", () => {
    expect(() => new Laboratory([])).toThrow("No substances provided");
  });

  it("throws when querying with empty substance name", () => {
    const lab = new Laboratory(["water"]);

    expect(() => lab.getQuantity("")).toThrow('Invalid substance: ""');
  });

  it("throws when querying with whitespace-only substance name", () => {
    const lab = new Laboratory(["water"]);

    expect(() => lab.getQuantity("  ")).toThrow('Invalid substance: "  "');
  });

  it("adds quantity for a known substance", () => {
    const lab = new Laboratory(["water"]);

    lab.add("water", 1.5);

    expect(lab.getQuantity("water")).toBe(1.5);
  });

  it("adds quantity cumulatively", () => {
    const lab = new Laboratory(["water"]);

    lab.add("water", 1.5);
    lab.add("water", 0.5);

    expect(lab.getQuantity("water")).toBe(2);
  });
});
