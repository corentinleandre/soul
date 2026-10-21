import SystemDataModel from "../../../abstract/system-data-model.mjs";


/**
 * A class used to descend an actor to the Item's model.
 */
export default class Descending extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    descending: true
  }, { inplace: false }));

}