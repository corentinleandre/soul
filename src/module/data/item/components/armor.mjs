import SystemDataModel from "../../../abstract/system-data-model.mjs";

const { SchemaField, NumberField, BooleanField, StringField } = foundry.data.fields;

export default class Armor extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    isArmor: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {
      armorPoints: new NumberField({required:true, initial:0})
    })
  }
}