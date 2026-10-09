import SystemDataModel from "../../../abstract/system-data-model.mjs";

/**
 * A class used to ascend the Item's model to an actor.
 * use ascend() to receive the item's model. It is a clone.
 */
export default class Ascending extends SystemDataModel {

  get hasAscending(){
    return true;
  }

  /**
   * ascends a structured clone of the item model, to prevent mutations.
   * @returns the item model clone
   */
  ascend(){
    return this;
  }

}