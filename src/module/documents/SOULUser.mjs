/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class SOULUser extends foundry.documents.User {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULUser} user      The user preparing derived data.
     */
    Hooks.callAll("SOUL.prepareUserData", this);
  }
}
