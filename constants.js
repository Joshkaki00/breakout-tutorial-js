import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Background from './Background.js';
import Score from './Score.js';
import Lives from './Lives.js';
import Brick from './Brick.js';
import GameManager from './GameManager.js';
import SoundManager from './SoundManager.js';

/* eslint-disable no-undef */
export const canvas = document.getElementById('myCanvas');
export const ctx = canvas.getContext('2d');

export const ball = new Ball(canvas.width / 2, canvas.height - 30, 10, 2, -2, '#FFD700', 5);
export const paddle = new Paddle((canvas.width - 75) / 2, canvas.height - 10, 75, 10, canvas);
export const background = new Background('#8A2BE2', '#000000');
export const score = new Score(8, 20);
export const lives = new Lives(canvas.width - 65, 20);
export const sounds = new SoundManager();

export const brickRowCount = 5;
export const brickColumnCount = 8;
export const brickPadding = 10;
export const brickOffsetTop = 30;
export const brickOffsetLeft = 30;

// eslint-disable-next-line max-len
export const brickWidth = (canvas.width - (brickOffsetLeft * 2) - (brickColumnCount - 1) * brickPadding) / brickColumnCount;
export const brickHeight = 20;

// Initialize bricks
// eslint-disable-next-line max-len
export const bricks = Array.from({ length: brickColumnCount }, (_, c) => Array.from({ length: brickRowCount }, (_, r) => new Brick(
  c * (brickWidth + brickPadding) + brickOffsetLeft,
  r * (brickHeight + brickPadding) + brickOffsetTop,
  brickWidth,
  brickHeight,
  ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF69B4'][r % 5],
)));

export const gameManager = new GameManager(ball, paddle, bricks, score, lives, canvas, sounds);
