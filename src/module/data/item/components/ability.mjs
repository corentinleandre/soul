import SystemDataModel from "../../abstract/system-data-model.mjs";

const { SchemaField, NumberField, BooleanField, StringField } = foundry.data.fields;

export default class Effect extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    hasAbility: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {
      requirements: new StringField(),
      effect: new StringField()
    })
  }
}