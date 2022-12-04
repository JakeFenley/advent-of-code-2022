import * as fs from 'fs';
import path from 'path';

let inputs = fs.readFileSync(
  path.join(__dirname, '../inputs/day2-small-sample.md'),
  'utf-8'
);

const game = inputs.split(/\n/).map((string) => string.split(' '));

type Shape = keyof typeof SHAPES;
type OpponentMove = keyof typeof OPPONENT_MOVES;
type Outcome = keyof typeof OUTCOME_SCORE;
type Round = [OpponentMove, Outcome];

const SHAPES = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors',
} as const;

const OPPONENT_MOVES = {
  A: SHAPES.rock,
  B: SHAPES.paper,
  C: SHAPES.scissors,
} as const;

const OUTCOME_SCORE = {
  X: 0,
  Y: 3,
  Z: 6,
} as const;

const SCORES = {
  [SHAPES.rock]: 1,
  [SHAPES.paper]: 2,
  [SHAPES.scissors]: 3,
} as const;

const WIN_SHAPE = {
  [SHAPES.rock]: SHAPES.paper,
  [SHAPES.paper]: SHAPES.scissors,
  [SHAPES.scissors]: SHAPES.rock,
};

const LOSS_SHAPE = {
  [SHAPES.rock]: SHAPES.scissors,
  [SHAPES.paper]: SHAPES.rock,
  [SHAPES.scissors]: SHAPES.paper,
};

const getPlayerShape = (opponentShape: Shape, outcome: Outcome): Shape => {
  // LOSS
  if (outcome === 'X') {
    return LOSS_SHAPE[opponentShape];
  }

  // DRAW
  if (outcome === 'Y') {
    return opponentShape;
  }

  // WIN
  return WIN_SHAPE[opponentShape];
};

const calculateScore = (
  opponentMove: OpponentMove,
  outcome: Outcome
): number => {
  const opponentShape = OPPONENT_MOVES[opponentMove];
  const playerShape = getPlayerShape(opponentShape, outcome);
  const playerScore = SCORES[playerShape];

  return playerScore + OUTCOME_SCORE[outcome];
};

const result = game.reduce((acc, curr: Round) => {
  return acc + calculateScore(curr[0], curr[1]);
}, 0);

console.log(result);
