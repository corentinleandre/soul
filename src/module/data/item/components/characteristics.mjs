import Ascending from "./abstract/ascending.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export class CharacteristicsModel extends Ascending {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata,{
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

  get hasCharacteristics(){
    return true;
  }
}