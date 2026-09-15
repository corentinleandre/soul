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

    this.strengthBonus = Math.floor(this.strength/10)
    this.dexterityBonus = Math.floor(this.dexterity/10)
    this.sensesBonus = Math.floor(this.senses/10)
    this.enduranceBonus = Math.floor(this.endurance/10)
    this.agilityBonus = Math.floor(this.agility/10)
    this.intelligenceBonus = Math.floor(this.intelligence/10)
    this.resilienceBonus = Math.floor(this.resilience/10)
    this.socialBonus = Math.floor(this.social/10)

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULActor} actor      The actor preparing derived data.
     */
    Hooks.callAll("SOUL.prepareActorData", this);
  }
}
