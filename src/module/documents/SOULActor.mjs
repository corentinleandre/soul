/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class SOULActor extends foundry.documents.Actor {

  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    // Convenience reads
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.soul || {};

    systemData.strengthBonus = Math.floor(systemData.strength/10)
    systemData.dexterityBonus = Math.floor(systemData.dexterity/10)
    systemData.sensesBonus = Math.floor(systemData.senses/10)
    systemData.enduranceBonus = Math.floor(systemData.endurance/10)
    systemData.agilityBonus = Math.floor(systemData.agility/10)
    systemData.intelligenceBonus = Math.floor(systemData.intelligence/10)
    systemData.resilienceBonus = Math.floor(systemData.resilience/10)
    systemData.socialBonus = Math.floor(systemData.social/10)

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULActor} actor      The actor preparing derived data.
     */
    Hooks.callAll("SOUL.prepareActorData", this);
  }
}
