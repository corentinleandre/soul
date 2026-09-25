const characteristics = {
  stamina: {
    label: "SOUL.Characteristics.stamina",
    shorthand: "SOUL.Characteristics.Shorthands.stamina",
    max:[["strength.bonus", 2]],
    base:[["strength.bonus",2]]
  },
  attacks: {
    label: "SOUL.Characteristics.attacks",
    shorthand: "SOUL.Characteristics.Shorthands.attacks",
    min:[["number", 1]]
  },
  fortune: {
    label: "SOUL.Characteristics.fortune",
    shorthand: "SOUL.Characteristics.Shorthands.fortune",
    min:[["number", 0]]
  },
  wounds: {
    label: "SOUL.Characteristics.wounds",
    shorthand: "SOUL.Characteristics.Shorthands.wounds",
    max:[["strength.rawBonus", 1],
         ["endurance.rawBonus", 2],
         ["resilience.rawBonus", 2]],
    base:[["strength.rawBonus", 1],
         ["endurance.rawBonus", 2],
         ["resilience.rawBonus", 2]],
    min:[["number", 0]]
  },
  movement: {
    label: "SOUL.Characteristics.movement",
    shorthand: "SOUL.Characteristics.Shorthands.movement",
    base:[["number",3]],
    min:[["number", 1]]
  },
  magic: {
    label: "SOUL.Characteristics.magic",
    shorthand: "SOUL.Characteristics.Shorthands.magic",
    base:[["number", 0]]
  },
  madness: {
    label: "SOUL.Characteristics.madness",
    shorthand: "SOUL.Characteristics.Shorthands.madness",
    base:[["number", 0]],
    min:[["number", 0]]
  },
  exhaustion: {
    label: "SOUL.Characteristics.exhaustion",
    shorthand: "SOUL.Characteristics.Shorthands.exhaustion",
    base:[["number", 0]],
    min:[["number", 0]]
  }
}


export default characteristics;