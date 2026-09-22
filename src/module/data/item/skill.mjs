const { SchemaField, NumberField, StringField } = foundry.data.fields;

/**
 * Simple data model for base creatures as a type of actor.
 */
export default class Skill extends foundry.abstract.TypeDataModel {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Skill"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return {
      ...super.defineSchema(),
      description: new StringField({initial:"Description here"}),
      level: new NumberField({required: true, integer: true, min: -1, initial: -1}),
      maxlevel: new NumberField({required: true, integer:true, min: -1, initial: -1}),
      maxmod: new NumberField({integer:true}),
      stat: new StringField({required:true, choices:CONFIG.SOUL.skills})
    }
  }
}