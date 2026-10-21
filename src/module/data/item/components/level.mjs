import SystemDataModel from "../../../abstract/system-data-model.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export default class Level extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    hasLevel: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {
      level: new NumberField({required:true, initial:0})
    })
  }
}