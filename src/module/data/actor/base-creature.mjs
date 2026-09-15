/**
 * Simple data model for game tokens as a type of actor.
 */
export default class BaseCreatureModel extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.BaseCreature"];

  /* -------------------------------------------------- */

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
}
