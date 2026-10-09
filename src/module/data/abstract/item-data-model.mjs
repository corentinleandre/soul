import SystemDataModel from "./system-data-model.mjs";

/**
 * @import { ItemDataModelMetadata } from "./_types.mjs";
 */


/**
 * Specialized Data class for items
 */
export default class ItemDataModel extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata,{
    physical: false
  }, { inplace: false }));

}