import ItemDataModel from "../abstract/item-data-model.mjs";
import {StatsModel} from "./components/stats.mjs";

const { SchemaField, NumberField, StringField, ArrayField } = foundry.data.fields;

export default class Race extends ItemDataModel.mixin(StatsModel){

  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Skill"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return {
      ...super.defineSchema(),
      label: new StringField({required:true, initial:"SOUL.Castes.caste"}),
    }
  }

}