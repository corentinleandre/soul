/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class SOULItem extends foundry.documents.Item {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    // Convenience reads
    const itemData = this;
    const systemData = itemData.system;
    const flags = itemData.flags.soul || {};

    if(this.isOwned){
      systemData.updateItem?.(this.actor)
    }
    systemData.computeItem();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULItem} item      The item preparing derived data.
     */
    Hooks.callAll("SOUL.prepareItemData", this);
  }
}
