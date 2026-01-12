export class Laboratory {
  private knownSubstances: Set<string>;

  constructor(knownSubstances: string[]) {
    this.knownSubstances = new Set(knownSubstances);
  }

  getQuantity(substance: string): number {
    if (!this.knownSubstances.has(substance)) {
      throw new Error(`Unknown substance: ${substance}`);
    }

    return 0;
  }
}
