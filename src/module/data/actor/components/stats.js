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
      console.log(this[stat])
      this[stat].compute?.();
    }

    console.log("computed on :")
    console.log(this);
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