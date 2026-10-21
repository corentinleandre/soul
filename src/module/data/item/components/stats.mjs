import Ascending from "./abstract/ascending.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export default class StatsModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    hasStats: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    let statSchema = {};

    for(const stat in CONFIG.SOUL.stats){
      statSchema[stat] = new NumberField();
    }

    const schema = this.mergeSchema(statSchema, {

    })

    return this.mergeSchema(super.defineSchema(), schema)
  }
}