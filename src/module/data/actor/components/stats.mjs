import SystemDataModel from "../../abstract/system-data-model.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export class StatsModel extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ActorDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    hasStats: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    let statSchema = {};

    for(const stat in CONFIG.SOUL.stats){
      statSchema[stat] = new StatField();
    }

    const schema = this.mergeSchema(statSchema, {

    })

    return this.mergeSchema(super.defineSchema(), schema)
  }

  get hasStats(){
    return true;
  }

  /**
   * Compute all the stats for this stat model
   */
  computeStats(){
    for(const stat in CONFIG.SOUL.stats){
      this.computeStat(stat);
    }
  }

  /**
   * A function to compute & update all the value, rawBonus and Bonus of stats
   * @param {String} stat the name of the stat that needs computing/updating
   */
  computeStat(stat){
    // Dont compute bullshit
    if(!Object.keys(CONFIG.SOUL.stats).includes(stat)){
      return;
    }
    this._computeStatValue(stat)
    this._computeStatRawBonus(stat)
    this._computeStatBonus(stat)
  }

  /**
   * Computes the value of a stat based on it's base, modifiers
   * @param {String} stat the name of the stat that needs computing/updating
   */
  _computeStatValue(stat){
    const obj = this[stat];
    obj.value = obj.base + obj.modifier;
  }

  /**
   * Computes the raw bonus of a stat based on it's value
   * @param {String} stat the name of the stat that needs computing/updating
   */
  _computeStatRawBonus(stat){
    const obj = this[stat];
    if(obj.value == null){
      this._computeStatValue(stat);
    }
    obj.rawBonus = Math.floor(obj.value / 10);
  }

  /**
   * Computes the bonus of a stat by adding the modifier
   * @param {*} stat the name of the stat that needs computing/updating
   */
  _computeStatBonus(stat){
    const obj = this[stat];
    if(obj.rawBonus == null){
      this._computeStatRawBonus(stat);
    }
    obj.bonus = obj.rawBonus + obj.bonusMod;
  }

}

export class StatField extends SchemaField {
  constructor(fields={}, options={}){
    fields = {
      base: new NumberField({required:true, integer: true, initial:0}),
      modifier: new NumberField({required:true, integer:true, initial:0}),
      bonusMod: new NumberField({required:true, integer:true, initial:0}),
      ...fields
    }
    super(fields,options);
  }
}