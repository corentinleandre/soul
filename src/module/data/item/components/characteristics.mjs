import SystemDataModel from "../../abstract/system-data-model.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export default class CharacteristicsModel extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    hasCharacteristics: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    let charSchema = {};

    for(const char in CONFIG.SOUL.characteristics){
      charSchema[char] = new NumberField();
    }

    const schema = this.mergeSchema(charSchema, {

    })

    return this.mergeSchema(super.defineSchema(), schema)
  }
}