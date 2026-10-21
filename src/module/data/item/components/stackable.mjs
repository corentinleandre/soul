import Ascending from "./abstract/ascending.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export default class Stackable {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    isStackable: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {
      stackSize: new NumberField({required:true, initial:0})
    })
  }
}