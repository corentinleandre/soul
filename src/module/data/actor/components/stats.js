import SystemDataModel from "../../abstract/system-data-model.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export class StatsModel extends SystemDataModel {
  static defineSchema(){
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

  get value() {
    return this.base + this.modifier + this.advances;
  }

  get bonus(){
    return this.rawBonus + bonusMod;
  }

  get rawBonus(){
    return Math.floor(this.value / 10);
  }
}