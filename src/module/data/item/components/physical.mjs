import Ascending from "./abstract/ascending.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export default class Physical {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    isPhysical: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {
      encumbrance: new NumberField({required:true, initial:0})
    })
  }
}