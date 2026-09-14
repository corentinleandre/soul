/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class SOULCombatant extends foundry.documents.Combatant {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULCombatant} combatant      The combatant preparing derived data.
     */
    Hooks.callAll("SOUL.prepareCombatantData", this);
  }
}
