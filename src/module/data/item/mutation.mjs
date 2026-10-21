import ItemDataModel from "../abstract/item-data-model.mjs";
import Ascending from "./components/abstract/ascending.mjs";
import Descending from "./components/abstract/descending.mjs"
import CharacteristicsModel from "./components/characteristics.mjs";
import StatsModel from "./components/stats.mjs";
import Weapon from "./components/weapon.mjs";
import Effect from "./components/effect.mjs";
import Level from "./components/level.mjs";
import Armor from "./components/armor.mjs";

const { SchemaField, NumberField, StringField, ArrayField } = foundry.data.fields;

export default class Mutation extends ItemDataModel.mixin(StatsModel, CharacteristicsModel, Ascending, Descending, Weapon, Effect, Level, Armor){

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    permanent: true
  }, { inplace: false }));

  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Mutations"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return {
      ...super.defineSchema(),
      label: new StringField({required:true, initial:"SOUL.Mutations.mutation"})
    }
  }

}