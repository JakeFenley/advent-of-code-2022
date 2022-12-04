import * as fs from 'fs';
import path from 'path';

let inputs = fs.readFileSync(
  path.join(__dirname, '../inputs/day2.md'),
  'utf-8'
);

const game = inputs.split(/\n/).map((string) => string.split(' '));

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

type OpponentMove = keyof typeof OPPONENT_MOVES;

const PLAYER_MOVES = {
  X: SHAPES.rock,
  Y: SHAPES.paper,
  Z: SHAPES.scissors,
} as const;

type PlayerMove = keyof typeof PLAYER_MOVES;
type Round = [OpponentMove, PlayerMove];

const SCORES = {
  [SHAPES.rock]: 1,
  [SHAPES.paper]: 2,
  [SHAPES.scissors]: 3,
} as const;

const LOSS_SCORE = 0;
const DRAW_SCORE = 3;
const WIN_SCORE = 6;

const calculateScore = (
  opponentMove: OpponentMove,
  playerMove: PlayerMove
): number => {
  const opponentShape = OPPONENT_MOVES[opponentMove];
  const playerShape = PLAYER_MOVES[playerMove];
  const playerScore = SCORES[playerShape];

  if (opponentShape === playerShape) {
    return DRAW_SCORE + playerScore;
  }

  if (opponentShape === SHAPES.rock && playerShape === SHAPES.paper) {
    return WIN_SCORE + playerScore;
  }

  if (opponentShape === SHAPES.paper && playerShape === SHAPES.scissors) {
    return WIN_SCORE + playerScore;
  }

  if (opponentShape === SHAPES.scissors && playerShape === SHAPES.rock) {
    return WIN_SCORE + playerScore;
  }

  return LOSS_SCORE + playerScore;
};

const result = game.reduce((acc, curr: Round) => {
  return acc + calculateScore(curr[0], curr[1]);
}, 0);

console.log(result);
