import ItemDataModel from "../abstract/item-data-model.mjs";
import {CharacteristicsModel} from "./components/characteristics.mjs";
import {StatsModel} from "./components/stats.mjs";

const { SchemaField, NumberField, StringField, ArrayField } = foundry.data.fields;

export default class Race extends ItemDataModel.mixin(StatsModel, CharacteristicsModel){

  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Skill"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return {
      ...super.defineSchema(),
      label: new StringField({required:true, initial:"SOUL.Races.race"}),
      castes: new ArrayField(new StringField())
    }
  }

}