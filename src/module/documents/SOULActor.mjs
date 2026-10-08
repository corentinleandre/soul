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

    //Item ascending information
    for(const item of this.actor.items){
      if(item.system.hasAscending?.() ?? false){
        this.receiveAscending(item.system.ascend())
      }
    }

    //computations with all the information
    if(systemData.hasStats ?? false){
      systemData.computeStats?.();
    }
    if(systemData.hasCharacteristics ?? false){
      systemData.computeCharacteristics?.();
      systemData.clampCharacteristics?.();
    }

    //Item descending information
    const descentClone = structuredClone(this);
    for(const item of this.actor.items){
      if(item.system.hasDescending?.() ?? false){
        item.system.descend(descentClone);
      }
    }

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULActor} actor      The actor preparing derived data.
     */
    Hooks.callAll("SOUL.prepareActorData", this);
  }

  receiveAscending(itemModel){

  }
}
