const { SchemaField, NumberField, BooleanField, StringField } = foundry.data.fields;

export default class Equippable {

  /**
   * Metadata that describes this DataModel
   * @type { ItemDataModelMetadata }
   */
  static metadata = Object.freeze(foundry.utils.mergeObject(this.mixedMetadata(),{
    isEquippable: true
  }, { inplace: false }));

  /** @inheritdoc */
  static defineSchema(){
    return this.mergeSchema(super.defineSchema(), {
      handSpace: new NumberField({required:true, initial:0})
    })
  }

  isWielded(){
    return this.handSpace > 0;
  }

  equip(){

  }
}