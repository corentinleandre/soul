import SystemDataModel from "../../../abstract/system-data-model.mjs";

/**
 * A class used to ascend the Item's model to an actor.
 * use ascend() to receive the item's model. It is a clone.
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