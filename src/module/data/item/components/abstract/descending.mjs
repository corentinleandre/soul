import SystemDataModel from "../../../abstract/system-data-model.mjs";


/**
 * A class used to descend an actor to the Item's model.
 * use descend(actor) to give the actor to the item.
 */
export default class Descending extends SystemDataModel {

  get hasDescendingInfo(){
    return true;
  }

  /**
   * Should be non-mutating, and only used to grab info.
   * @param {*} actor the actor that is affecting this item (preferably a clone)
   */
  descend(actor){

  }

}