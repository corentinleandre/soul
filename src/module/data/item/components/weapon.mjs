import SystemDataModel from "../../abstract/system-data-model.mjs";

const { SchemaField, NumberField, BooleanField, StringField } = foundry.data.fields;

export default class Weapon extends SystemDataModel {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    isWeapon: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {
      isRanged: new BooleanField({required:true, initial:false}),
      range: new NumberField(),
      damageMod: new NumberField({required:true, initial:0}),
      damageType: new StringField({required:true, initial:"Physical"}),
      useStrengthBonus: new BooleanField({required:true, initial:true})
    })
  }
}