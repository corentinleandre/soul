import ItemDataModel from "../abstract/item-data-model.mjs";
import {StatsModel} from "./components/stats.mjs";

const { SchemaField, NumberField, StringField, ArrayField } = foundry.data.fields;

export default class Caste extends ItemDataModel.mixin(StatsModel){

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    permanent: true
  }, { inplace: false }));

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