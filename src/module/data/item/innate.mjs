import ItemDataModel from "../abstract/item-data-model.mjs";
import Ascending from "./components/abstract/ascending.mjs";
import CharacteristicsModel from "./components/characteristics.mjs";
import StatsModel from "./components/stats.mjs";

const { SchemaField, NumberField, StringField, ArrayField } = foundry.data.fields;

export default class Innate extends ItemDataModel.mixin(StatsModel, CharacteristicsModel, Ascending){

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    permanent: true
  }, { inplace: false }));

  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Innate"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return {
      ...super.defineSchema()
    }
  }

}