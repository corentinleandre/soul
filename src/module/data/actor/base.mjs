import ActorDataModel from "../abstract/actor-data-model.mjs"
import { StatsModel } from "./components/stats.mjs"
import { CharacteristicsModel } from "./components/characteristics.mjs"

const { SchemaField, NumberField } = foundry.data.fields;

/**
 * Simple data model for base creatures as a type of actor.
 */
export default class BaseModel extends ActorDataModel.mixin(StatsModel, CharacteristicsModel) {
  /** @inheritdoc */
  static LOCALIZATION_PREFIXES = ["SOUL.Base"];

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {

    })
  }
}
