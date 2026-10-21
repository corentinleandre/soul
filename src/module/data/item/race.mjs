import ItemDataModel from "../abstract/item-data-model.mjs";
import Ascending from "./components/abstract/ascending.mjs";
import CharacteristicsModel from "./components/characteristics.mjs";
import StatsModel from "./components/stats.mjs";
import Effect from "./components/effect.mjs"

const { SchemaField, NumberField, StringField, ArrayField } = foundry.data.fields;

export default class Race extends ItemDataModel.mixin(StatsModel, CharacteristicsModel, Ascending, Effect){

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    permanent: true
  }, { inplace: false }));

  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Races"];

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