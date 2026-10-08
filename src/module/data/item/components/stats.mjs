import Ascending from "./abstract/ascending.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export class StatsModel extends Ascending {

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

  get hasStats(){
    return true;
  }
}