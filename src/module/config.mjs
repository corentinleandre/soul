import config from "./config/_module.mjs";

const SOUL = {};

/* Populate the config using all the configs in the config folder */

for(const key in config){
  SOUL[key] = config[key];
}

SOUL.chess = {
  pieces: {
    pawn: {
      label: "SOUL.Chess.Pieces.P",
      abbr: "P",
      value: 1,
    },
    knight: {
      label: "SOUL.Chess.Pieces.K",
      abbr: "N",
      value: 3,
    },
    bishop: {
      label: "SOUL.Chess.Pieces.B",
      abbr: "B",
      value: 3,
    },
    rook: {
      label: "SOUL.Chess.Pieces.R",
      abbr: "R",
      value: 5,
    },
    queen: {
      label: "SOUL.Chess.Pieces.Q",
      abbr: "Q",
      value: 9,
    },
    king: {
      label: "SOUL.Chess.Pieces.K",
      abbr: "K",
      value: Infinity,
    },
  },
};

export default SOUL;
