import ItemDataModel from "../abstract/item-data-model.mjs"
import Descending from "./components/abstract/descending.mjs"

const { SchemaField, NumberField, StringField } = foundry.data.fields;

/**
 * Simple data model for skills as items.
 */
export default class Skill extends ItemDataModel.mixin(Descending) {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Skill"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return {
      ...super.defineSchema(),
      description: new StringField({initial:"Description here"}),
      level: new NumberField({required: true, integer: true, min: -1, initial: -1}),
      maxLevel: new NumberField({required: true, integer:true, min: -1, initial: -1}),
      maxMod: new NumberField({integer:true, initial:0}),
      stat: new StringField({required:true, choices:CONFIG.SOUL.stats, initial:"intelligence"}),
      modifier: new NumberField({integer: true, initial:0})
    }
  }

  /* -------------------------------------------- */
  /*  Inherited from ItemDatalModel               */
  /* -------------------------------------------- */

  /** @inheritdoc */
  descend(actor){
    this.statValue = actor.system[this.stat]?.value ?? 0;
    this.value = this.getSkillValue(this.statValue);
  }

  get isSkill() {
    return true;
  }

  get isTrained(){
    return this.level > -1;
  }

  get skillValue(){
    return this.getSkillValue(this.statValue);
  }

  resetModifier(){
    this.modifier = 0;
  }

  getSkillValue(stat){
    if(this.isTrained){
      return stat + (this.level*10);
    }else{
      return stat/2;
    }
  }

}