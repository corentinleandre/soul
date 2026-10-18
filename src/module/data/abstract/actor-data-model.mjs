import SystemDataModel from "./system-data-model.mjs";

/**
 * @import { ActorDataModelMetadata } from "./_types.mjs";
 */


/**
 * Specialized Data class for actors
 */
export default class ActorDataModel extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ActorDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    scarrable: false
  }, { inplace: false }));

}