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
});
