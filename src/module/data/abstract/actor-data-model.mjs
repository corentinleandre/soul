import SystemDataModel from "./system-data-model.mjs";

/**
 * @import { ActorDataModelMetadata } from "./_types.mjs";
 */


/**
 * Specialized Data class for actors
 */
export default class ActorDataMode extends SystemDataModel {

  static metadata = Object.freeze({
    scarrable: false
  });

}