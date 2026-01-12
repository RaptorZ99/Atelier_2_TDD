import { Laboratory } from "../src/Laboratory";

describe("Laboratory initialization", () => {
  it("returns 0 for a known substance", () => {
    const lab = new Laboratory(["water"]);

    expect(lab.getQuantity("water")).toBe(0);
  });
});
