import ChessModel from "./chess.mjs";
import GameTokenModel from "./game-token.mjs";
import Base from "./base.mjs";

const config = {
  chess: ChessModel,
  token: GameTokenModel,
  basechar: Base,
};

export { ChessModel, GameTokenModel, Base, config };
