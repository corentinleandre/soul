/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class SOULCards extends foundry.documents.Cards {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULCards} cards      The cards preparing derived data.
     */
    Hooks.callAll("SOUL.prepareCardsData", this);
  }
}
