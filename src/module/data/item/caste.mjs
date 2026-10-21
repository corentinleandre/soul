import ItemDataModel from "../abstract/item-data-model.mjs";
import Ascending from "./components/abstract/ascending.mjs";
import StatsModel from "./components/stats.mjs";

const { SchemaField, NumberField, StringField, ArrayField } = foundry.data.fields;

export default class Caste extends ItemDataModel.mixin(StatsModel, Ascending){

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    permanent: true
  }, { inplace: false }));

  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Castes"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return {
      ...super.defineSchema(),
      label: new StringField({required:true, initial:"SOUL.Castes.caste"}),
    }
  }

}