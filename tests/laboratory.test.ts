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

  it("throws when adding unknown substance", () => {
    const lab = new Laboratory(["water"]);

    expect(() => lab.add("salt", 1)).toThrow("Unknown substance: salt");
  });

  it("throws when adding with empty substance name", () => {
    const lab = new Laboratory(["water"]);

    expect(() => lab.add("", 1)).toThrow('Invalid substance: ""');
  });

  it("throws when adding a negative quantity", () => {
    const lab = new Laboratory(["water"]);

    expect(() => lab.add("water", -1)).toThrow("Invalid quantity: -1");
  });

  it("throws when adding NaN quantity", () => {
    const lab = new Laboratory(["water"]);

    expect(() => lab.add("water", Number.NaN)).toThrow(
      "Invalid quantity: NaN"
    );
  });

  it("throws when adding infinite quantity", () => {
    const lab = new Laboratory(["water"]);

    expect(() => lab.add("water", Number.POSITIVE_INFINITY)).toThrow(
      "Invalid quantity: Infinity"
    );
  });

  it("treats reaction products as known items", () => {
    const lab = new Laboratory(["water"], { steam: [[1, "water"]] });

    expect(lab.getQuantity("steam")).toBe(0);
  });

  it("throws when reaction product name is empty", () => {
    expect(() => new Laboratory(["water"], { "": [[1, "water"]] })).toThrow(
      'Invalid product: ""'
    );
  });

  it("throws when reaction product name is whitespace-only", () => {
    expect(() =>
      new Laboratory(["water"], { "   ": [[1, "water"]] })
    ).toThrow('Invalid product: "   "');
  });

  it("throws when a reaction ingredient is unknown", () => {
    expect(() =>
      new Laboratory(["water"], { steam: [[1, "unknown"]] })
    ).toThrow("Unknown ingredient: unknown");
  });

  it("throws when a reaction ingredient quantity is negative", () => {
    expect(() =>
      new Laboratory(["water"], { steam: [[-1, "water"]] })
    ).toThrow("Invalid quantity: -1");
  });

  it("throws when a reaction ingredient quantity is NaN", () => {
    expect(() =>
      new Laboratory(["water"], { steam: [[Number.NaN, "water"]] })
    ).toThrow("Invalid quantity: NaN");
  });

  it("throws when a reaction ingredient quantity is infinite", () => {
    expect(() =>
      new Laboratory(["water"], {
        steam: [[Number.POSITIVE_INFINITY, "water"]],
      })
    ).toThrow("Invalid quantity: Infinity");
  });

  it("throws when a reaction ingredient name is empty", () => {
    expect(() =>
      new Laboratory(["water"], { steam: [[1, ""]] })
    ).toThrow('Invalid ingredient: ""');
  });

  it("throws when a reaction ingredient name is whitespace-only", () => {
    expect(() =>
      new Laboratory(["water"], { steam: [[1, "   "]] })
    ).toThrow('Invalid ingredient: "   "');
  });

  it("adds quantity for a product", () => {
    const lab = new Laboratory(["water"], { steam: [[1, "water"]] });

    lab.add("steam", 2);

    expect(lab.getQuantity("steam")).toBe(2);
  });
});
