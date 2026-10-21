import SystemDataModel from "../../../abstract/system-data-model.mjs";

/**
 * A class used to ascend the Item's model to an actor.
 */
export default class Ascending extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    ascending: true
  }, { inplace: false }));

}