export class Laboratory {
  private knownSubstances: Set<string>;

  constructor(knownSubstances: string[]) {
    this.knownSubstances = new Set();

    for (const substance of knownSubstances) {
      if (this.knownSubstances.has(substance)) {
        throw new Error(`Duplicate substance: ${substance}`);
      }
      this.knownSubstances.add(substance);
    }
  }

  getQuantity(substance: string): number {
    if (!this.knownSubstances.has(substance)) {
      throw new Error(`Unknown substance: ${substance}`);
    }

    return 0;
  }
}
