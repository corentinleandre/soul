import SystemDataModel from "./system-data-model.mjs";

/**
 * @import { ActorDataModelMetadata } from "./_types.mjs";
 */


/**
 * Specialized Data class for actors
 */
export default class ActorDataMode extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ActorDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata,{
    scarrable: false
  }, { inplace: false }));

}