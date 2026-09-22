import ActorDataModel from "../abstract/actor-data-model.mjs"
import { StatsModel } from "./components/stats"

const { SchemaField, NumberField } = foundry.data.fields;

/**
 * Simple data model for base creatures as a type of actor.
 */
export default class BaseModel extends ActorDataModel.mixin(StatsModel) {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Base"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {

    })
  }
}
