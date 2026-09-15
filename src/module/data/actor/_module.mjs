import ChessModel from "./chess.mjs";
import GameTokenModel from "./game-token.mjs";
import BaseCreature from "./base-creature.mjs";

const config = {
  chess: ChessModel,
  token: GameTokenModel,
  basecreature: BaseCreature,
};

export { ChessModel, GameTokenModel, BaseCreature, config };
