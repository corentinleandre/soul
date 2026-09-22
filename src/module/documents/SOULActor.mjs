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

    systemData.computeStats?.();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULActor} actor      The actor preparing derived data.
     */
    Hooks.callAll("SOUL.prepareActorData", this);
  }
}
