import SystemDataModel from "../../abstract/system-data-model.mjs";

const { SchemaField, NumberField } = foundry.data.fields;

export class CharacteristicsModel extends SystemDataModel {

  /** @inheritdoc */
  static defineSchema(){
    let charSchema = {};

    for(const char in CONFIG.SOUL.characteristics){
      charSchema[char] = new CharacteristicField();
    }

    const schema = this.mergeSchema(charSchema, {

    })

    return this.mergeSchema(super.defineSchema(), schema)
  }

  /* -------------------------------------------- */
  /*  Computing                                   */
  /* -------------------------------------------- */

  /**
   * Compute all characteristics, updating their mins, maxes and bases
   */
  computeCharacteristics(){
    for(const char in CONFIG.SOUL.characteristics){
      this.computeCharacteristic(char);
    }
  }

  /**
   * Computes a characteristic's min, max and base.
   * @param {*} char the characteristic to be computed.
   * @param {{ max: boolean; min: boolean; base: boolean; }} [options={max:true, min:true, base:true}] what options of that characteristic must be computed
   */
  computeCharacteristic(char, options = {max:true, min:true, base:true}){
    //Don't compute bullshit
    if(!Object.keys(CONFIG.SOUL.characteristics).includes(char)){
      return;
    }

    for(const option in options){
      //if the option exists, compute it.
      if(options[option] && Object.keys(CONFIG.SOUL.characteristics[char]).includes(option)){
        this._computeCharOption(char, option);
      }
    }
  }

  /**
   * Computes a characteristic's max value. Checks on wether the char and the option already exists should already be done.
   * @param {*} char the characteristic whose max is computed
   * @param {*} option the option of the characteristic that must be computed.
   */
  _computeCharOption(char, option){
    //check if config has a max (char is already checked as included)
    //If not, return
    const toCompute = CONFIG.SOUL.characteristics[char][option];
    let computedVal = 0;

    //compute max
    for(const step of toCompute){
      if(step[0] === "number"){
        computedVal += step[1]
      }else{
        let val = this;
        //get the value by descending into the model
        for(const prop of step[0].split(".")){
          if(val != undefined){
            val = val[prop];
          }else{
            break;
          }
        }
        //make the value 0 if undefined
        val = val ?? 0
        //if it works, use it
        if(Number.isSafeInteger(val)){
          computedVal += val * step[1];
        }
      }
    }

    this[char][option] = computedVal;
  }

  /* -------------------------------------------- */
  /*  Clamping                                    */
  /* -------------------------------------------- */

  clampCharacteristics(){
    for(const char in CONFIG.SOUL.characteristics){
      this.clampCharacteristic(char);
    }
  }

  /**
   * A function that clamps a characteristic between their min and their max if they are defined
   * @param {*} char the characteristic that needs clamping
   */
  clampCharacteristic(char){
    if(!Object.keys(CONFIG.SOUL.characteristics).includes(char)){
      return;
    }

    //if the value doesn't exist, make it the base
    if(!this[char].value){
      if(!this[char].base){
        this.computeCharacteristic(char, {max:false, min:false, base:true});
      }
      this[char].value = this[char].base;
    }

    // clamp if the max or min is defined.
    if(this[char].max && this[char].value > this[char].max){
      this[char].value = this[char].max;
    }
    if(this[char].min && this[char].value < this[char].min){
      this[char].value = this[char].min;
    }
  }

  /* -------------------------------------------- */

  get hasCharacteristics(){
    return true;
  }

}



export class CharacteristicField extends SchemaField {
  constructor(fields={}, options={}){
    fields = {
      base: new NumberField({required:true, integer: true, min: 0, initial:0}),
      min: new NumberField({integer:true}),
      value: new NumberField({integer:true}),
      max: new NumberField({integer:true}),
      ...fields
    }
    super(fields,options);
  }
}