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

    // reinitialize storage when loading everything back up
    systemData.storage = {};

    //Item ascending information
    for(const item of this.items){
      if(item.system.metadata.ascending ?? false){
        this.derive(item);
      }
    }

    //computations with all the information
    if(systemData.metadata.hasStats ?? false){
      systemData.computeStats?.();
    }
    if(systemData.metadata.hasCharacteristics ?? false){
      systemData.computeCharacteristics?.();
      systemData.clampCharacteristics?.();
    }

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULActor} actor      The actor preparing derived data.
     */
    Hooks.callAll("SOUL.prepareActorData", this);
  }

  derive(item){
    if(item.system.metadata.hasStats ?? false){
      for(const stat in CONFIG.SOUL.stats){
        if(item.system.metadata.permanent ?? false){
          this.system[stat].base += item.system[stat] ?? 0;
        }else{
          this.system[stat].modifier += item.system[stat] ?? 0;
        }
      }
    }
    if(item.system.metadata.hasCharacteristics ?? false){
      for(const char in CONFIG.SOUL.characteristics){
        if(item.system.metadata.permanent ?? false){
          this.system[char].base += item.system[char] ?? 0;
        }else{
          this.system[char].modifier += item.system[char] ?? 0;
        }
      }
    }
  }

}
