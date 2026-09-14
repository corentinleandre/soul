/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class SOULActor extends foundry.documents.Actor {

  /** @inheritdoc */
  static defineSchema(){
    return {
      ...super.defineSchema(),
      strength : new NumberField({required: true, integer: true, min: 0, initial: 25}),
      dexterity : new NumberField({required: true, integer: true, min: 0, initial: 25}),
      senses : new NumberField({required: true, integer: true, min: 0, initial: 25}),
      endurance : new NumberField({required: true, integer: true, min: 0, initial: 25}),
      agility : new NumberField({required: true, integer: true, min: 0, initial: 25}),
      intelligence : new NumberField({required: true, integer: true, min: 0, initial: 25}),
      resilience : new NumberField({required: true, integer: true, min: 0, initial: 25}),
      social : new NumberField({required: true, integer: true, min: 0, initial: 25})
    }
  }

  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULActor} actor      The actor preparing derived data.
     */
    Hooks.callAll("SOUL.prepareActorData", this);
  }
}
