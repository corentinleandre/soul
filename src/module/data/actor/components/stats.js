import SystemDataModel from "../../abstract/system-data-model.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export class StatsModel extends SystemDataModel {

  static defineSchema(){
    let statSchema = {};

    for(const stat in CONFIG.SOUL.stats){
      statSchema[stat] = new StatField();
    }

    const schema = this.mergeSchema(statSchema, {

    })

    return this.mergeSchema(super.defineSchema(), schema)
  }

  computeStats(){
    for(const stat in CONFIG.SOUL.stats){
      this.compute(stat);
    }
  }

  compute(stat){
    // Dont compute bullshit
    if(!Object.keys(CONFIG.SOUL.stats).contains(stat)){
      return;
    }
    this._computeValue(stat)
    this._computeRawBonus(stat)
    this._computeBonus(stat)
  }

  _computeValue(stat){
    const obj = this[stat];
    obj.value = obj.base + obj.modifier + obj.advances;
  }

  _computeRawBonus(stat){
    const obj = this[stat];
    if(obj.value == null){
      this._computeValue(stat);
    }
    obj.rawBonus = Math.floor(obj.value / 10);
  }

  _computeBonus(stat){
    const obj = this[stat];
    if(obj.rawBonus == null){
      this._computeRawBonus(stat);
    }
    obj.bonus = obj.rawBonus + obj.bonusMod;
  }


}

export class StatField extends SchemaField {
  constructor(fields={}, options={}){
    fields = {
      base: new NumberField({required:true, integer: true, min: 0, initial:25}),
      modifier: new NumberField({required:true, integer:true, initial:0}),
      advances: new NumberField({required:true, integer:true, initial:0}),
      bonusMod: new NumberField({required:true, integer:true, initial:0}),
      ...fields
    }
    super(fields,options);
  }

  compute(){
    this.computeValue();
    this.computeRawBonus();
    this.computeBonus();
  }

  computeValue(){
    this.value = this.base + this.modifier + this.advances;
    console.log("computed value on");
    console.log(this)
  }

  computeBonus(){
    this.bonus = this.rawBonus + this.bonusMod;
  }

  computeRawBonus(){
    this.rawBonus = Math.floor(this.value / 10);
  }
}