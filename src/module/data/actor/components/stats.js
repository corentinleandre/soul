import SystemDataModel from "../../abstract/system-data-model.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export class StatsModel extends SystemDataModel {

  static statList = Object.freeze(["strength","dexterity","senses","endurance","agility","intelligence","resilience","social"]);

  static defineSchema(){
    let statSchema = {};

    for(const stat in this.statList){
      statSchema[stat] = new StatField();
    }

    return this.mergeSchema(super.defineSchema(), {
      strength: new StatField(),
      dexterity: new StatField(),
      senses: new StatField(),
      endurance: new StatField(),
      agility: new StatField(),
      intelligence: new StatField(),
      resilience: new StatField(),
      social: new StatField()
    })
  }

  computeStats(){
    for(const stat in this.statList){
      this[stat].compute();
    }
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
  }

  computeBonus(){
    this.bonus = this.rawBonus + this.bonusMod;
  }

  computeRawBonus(){
    this.rawBonus = Math.floor(this.value / 10);
  }
}