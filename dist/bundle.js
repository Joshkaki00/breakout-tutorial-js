/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Background.js":
/*!***************************!*\
  !*** ./src/Background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Background)\n/* harmony export */ });\nclass Background {\n  constructor(color1, color2) {\n    this.color1 = color1;\n    this.color2 = color2;\n  }\n\n  render(ctx, canvas) {\n    const gradient = ctx.createRadialGradient(\n      canvas.width / 2,\n      canvas.height / 2,\n      50,\n      canvas.width / 2,\n      canvas.height / 2,\n      canvas.width,\n    );\n    gradient.addColorStop(0, this.color1);\n    gradient.addColorStop(1, this.color2);\n\n    ctx.fillStyle = gradient;\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Background.js?");

/***/ }),

/***/ "./src/Ball.js":
/*!*********************!*\
  !*** ./src/Ball.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ball)\n/* harmony export */ });\n/* harmony import */ var _Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite.js */ \"./src/Sprite.js\");\n\n\nclass Ball extends _Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, radius, dx, dy, color = '#FFD700', maxSpeed = 5) {\n    super(x, y, radius * 2, radius * 2, color);\n    this.radius = radius;\n    this.dx = dx;\n    this.dy = dy;\n    this.baseSpeed = Math.sqrt(dx ** 2 + dy ** 2);\n    this.maxSpeed = maxSpeed;\n  }\n\n  move() {\n    this.x += this.dx;\n    this.y += this.dy;\n  }\n\n  increaseSpeed(score) {\n    const speedFactor = 1 + score * 0.001;\n    const newSpeed = Math.min(this.maxSpeed, this.baseSpeed * speedFactor);\n    const angle = Math.atan2(this.dy, this.dx);\n    this.dx = newSpeed * Math.cos(angle);\n    this.dy = newSpeed * Math.sin(angle);\n  }\n\n  bounceOffPaddle(paddle) {\n    const paddleTop = paddle.y;\n    const paddleBottom = paddle.y + paddle.height;\n    const paddleLeft = paddle.x;\n    const paddleRight = paddle.x + paddle.width;\n\n    if (\n      this.y + this.radius >= paddleTop\n      && this.y + this.radius <= paddleBottom\n      && this.x >= paddleLeft\n      && this.x <= paddleRight\n    ) {\n      const relativeIntersectX = this.x - (paddle.x + paddle.width / 2);\n      const normalizedRelativeIntersectX = relativeIntersectX / (paddle.width / 2);\n\n      if (Math.abs(normalizedRelativeIntersectX) < 0.2) {\n        this.dy = -Math.abs(this.dy);\n      } else {\n        const bounceAngle = normalizedRelativeIntersectX * (Math.PI / 3);\n        const speed = Math.sqrt(this.dx ** 2 + this.dy ** 2);\n        this.dx = speed * Math.cos(bounceAngle);\n        this.dy = -Math.abs(speed * Math.sin(bounceAngle));\n      }\n    }\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Ball.js?");

/***/ }),

/***/ "./src/Brick.js":
/*!**********************!*\
  !*** ./src/Brick.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Brick)\n/* harmony export */ });\n/* harmony import */ var _Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite.js */ \"./src/Sprite.js\");\n\n\nclass Brick extends _Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, width, height, color, status = 1) {\n    super(x, y, width, height, color);\n    this.status = status;\n  }\n\n  render(ctx) {\n    if (this.status === 1) {\n      super.render(ctx);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Brick.js?");

/***/ }),

/***/ "./src/GameManager.js":
/*!****************************!*\
  !*** ./src/GameManager.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameManager)\n/* harmony export */ });\n/* harmony import */ var _SoundManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SoundManager.js */ \"./src/SoundManager.js\");\n// eslint-disable-next-line import/extensions\n\n\nclass GameManager {\n  constructor(ball, paddle, bricks, score, lives, canvas) {\n    this.ball = ball;\n    this.paddle = paddle;\n    this.bricks = bricks;\n    this.score = score;\n    this.lives = lives;\n    this.canvas = canvas;\n    this.sounds = new _SoundManager_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.sounds.startBackgroundMusic();\n  }\n\n  collisionDetection() {\n    let hitBrick = false;\n    this.bricks.flat().forEach((brick) => {\n      if (\n        brick.status === 1\n        && this.ball.x > brick.x\n        && this.ball.x < brick.x + brick.width\n        && this.ball.y > brick.y\n        && this.ball.y < brick.y + brick.height\n      ) {\n        this.ball.dy = -this.ball.dy;\n        const updatedBrick = brick;\n        updatedBrick.status = 0;\n        this.score.update(10);\n        hitBrick = true;\n      }\n    });\n\n    if (hitBrick) {\n      this.ball.increaseSpeed(this.score.score);\n      this.sounds.play('brickHit');\n    }\n  }\n\n  checkGameOver() {\n    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {\n      if (this.ball.bounceOffPaddle(this.paddle)) {\n        this.sounds.play('paddleHit');\n      } else {\n        this.lives.loseLife();\n        this.sounds.play('ballMiss');\n\n        if (this.lives.lives === 0) {\n          this.sounds.stopBackgroundMusic();\n          this.sounds.play('gameOver');\n          alert('GAME OVER');\n          // eslint-disable-next-line no-undef\n          document.location.reload();\n        } else {\n          this.resetBall();\n        }\n      }\n    }\n  }\n\n  checkWinCondition() {\n    if (this.bricks.flat().every((brick) => brick.status === 0)) {\n      this.sounds.stopBackgroundMusic();\n      this.sounds.play('win');\n      setTimeout(() => {\n        alert('YOU WIN! CONGRATULATIONS!');\n        // eslint-disable-next-line no-undef\n        document.location.reload();\n      }, 500);\n    }\n  }\n\n  resetBall() {\n    this.ball.x = this.canvas.width / 2;\n    this.ball.y = this.canvas.height / 1.5;\n    this.paddle.x = (this.canvas.width - this.paddle.width) / 2;\n    const angle = Math.random() * Math.PI / 4 - Math.PI / 8;\n    const speedMultiplier = 1.05; // Slight speed increase after each reset\n    // eslint-disable-next-line max-len\n    const speed = Math.sqrt(this.ball.dx * this.ball.dx + this.ball.dy * this.ball.dy) * speedMultiplier;\n    this.ball.dx = speed * Math.cos(angle);\n    this.ball.dy = -speed * Math.sin(angle);\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/GameManager.js?");

/***/ }),

/***/ "./src/Lives.js":
/*!**********************!*\
  !*** ./src/Lives.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Lives)\n/* harmony export */ });\nclass Lives {\n  constructor(x, y, color = '#0095DD', font = '16px Arial', lives = 3) {\n    this.x = x;\n    this.y = y;\n    this.color = color;\n    this.font = font;\n    this.lives = lives;\n  }\n\n  loseLife() {\n    this.lives -= 1;\n  }\n\n  reset() {\n    this.lives = 3;\n  }\n\n  render(ctx) {\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Lives.js?");

/***/ }),

/***/ "./src/Paddle.js":
/*!***********************!*\
  !*** ./src/Paddle.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Paddle)\n/* harmony export */ });\n/* harmony import */ var _Sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite.js */ \"./src/Sprite.js\");\n\n\nclass Paddle extends _Sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, width, height, canvas, color = '#40E0D0') {\n    super(x, y, width, height, color);\n    this.canvas = canvas;\n    this.speed = 7;\n    this.rightPressed = false;\n    this.leftPressed = false;\n    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));\n  }\n\n  handleKeyDown(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = true;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = true;\n    }\n  }\n\n  handleKeyUp(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = false;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = false;\n    }\n  }\n\n  handleMouseMove(e) {\n    const relativeX = e.clientX - this.canvas.offsetLeft;\n    if (relativeX > 0 && relativeX < this.canvas.width) {\n      this.x = relativeX - this.width / 2;\n    }\n  }\n\n  move() {\n    if (this.rightPressed) {\n      this.x = Math.min(this.x + this.speed, this.canvas.width - this.width);\n    } else if (this.leftPressed) {\n      this.x = Math.max(this.x - this.speed, 0);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Paddle.js?");

/***/ }),

/***/ "./src/Score.js":
/*!**********************!*\
  !*** ./src/Score.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Score)\n/* harmony export */ });\nclass Score {\n  constructor(x, y, color = '#0095DD', font = '16px Arial') {\n    this.x = x;\n    this.y = y;\n    this.color = color;\n    this.font = font;\n    this.score = 0;\n  }\n\n  update(points) {\n    this.score += points;\n  }\n\n  reset() {\n    this.score = 0;\n  }\n\n  render(ctx) {\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`Score: ${this.score}`, this.x, this.y);\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Score.js?");

/***/ }),

/***/ "./src/SoundManager.js":
/*!*****************************!*\
  !*** ./src/SoundManager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SoundManager)\n/* harmony export */ });\nclass SoundManager {\n  constructor() {\n    this.sounds = {\n      brickHit: new Audio('assets/sounds/brick-hit.mp3'),\n      paddleHit: new Audio('assets/sounds/paddle-hit.mp3'),\n      gameOver: new Audio('assets/sounds/game-over.mp3'),\n      ballMiss: new Audio('assets/sounds/ball-miss.mp3'),\n      win: new Audio('assets/sounds/win.mp3'),\n      backgroundMusic: new Audio('assets/sounds/background-music.mp3'),\n    };\n    this.sounds.backgroundMusic.loop = true;\n    this.sounds.backgroundMusic.volume = 0.3;\n  }\n\n  play(name) {\n    if (this.sounds[name]) {\n      this.sounds[name].play();\n    }\n  }\n\n  startBackgroundMusic() {\n    this.sounds.backgroundMusic.play();\n  }\n\n  stopBackgroundMusic() {\n    this.sounds.backgroundMusic.pause();\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/SoundManager.js?");

/***/ }),

/***/ "./src/Sprite.js":
/*!***********************!*\
  !*** ./src/Sprite.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Sprite)\n/* harmony export */ });\nclass Sprite {\n  constructor(x, y, width, height, color) {\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n    this.color = color;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, this.y, this.width, this.height);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Sprite.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   background: () => (/* binding */ background),\n/* harmony export */   ball: () => (/* binding */ ball),\n/* harmony export */   brickColumnCount: () => (/* binding */ brickColumnCount),\n/* harmony export */   brickHeight: () => (/* binding */ brickHeight),\n/* harmony export */   brickOffsetLeft: () => (/* binding */ brickOffsetLeft),\n/* harmony export */   brickOffsetTop: () => (/* binding */ brickOffsetTop),\n/* harmony export */   brickPadding: () => (/* binding */ brickPadding),\n/* harmony export */   brickRowCount: () => (/* binding */ brickRowCount),\n/* harmony export */   brickWidth: () => (/* binding */ brickWidth),\n/* harmony export */   bricks: () => (/* binding */ bricks),\n/* harmony export */   canvas: () => (/* binding */ canvas),\n/* harmony export */   ctx: () => (/* binding */ ctx),\n/* harmony export */   gameManager: () => (/* binding */ gameManager),\n/* harmony export */   lives: () => (/* binding */ lives),\n/* harmony export */   paddle: () => (/* binding */ paddle),\n/* harmony export */   score: () => (/* binding */ score),\n/* harmony export */   sounds: () => (/* binding */ sounds)\n/* harmony export */ });\n/* harmony import */ var _Ball_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball.js */ \"./src/Ball.js\");\n/* harmony import */ var _Paddle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Paddle.js */ \"./src/Paddle.js\");\n/* harmony import */ var _Background_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Background.js */ \"./src/Background.js\");\n/* harmony import */ var _Score_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Score.js */ \"./src/Score.js\");\n/* harmony import */ var _Lives_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Lives.js */ \"./src/Lives.js\");\n/* harmony import */ var _Brick_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Brick.js */ \"./src/Brick.js\");\n/* harmony import */ var _GameManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GameManager.js */ \"./src/GameManager.js\");\n/* harmony import */ var _SoundManager_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SoundManager.js */ \"./src/SoundManager.js\");\n\n\n\n\n\n\n\n\n\n/* eslint-disable no-undef */\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\nconst ball = new _Ball_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas.width / 2, canvas.height - 30, 10, 2, -2, '#FFD700', 5);\nconst paddle = new _Paddle_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]((canvas.width - 75) / 2, canvas.height - 10, 75, 10, canvas);\nconst background = new _Background_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('#8A2BE2', '#000000');\nconst score = new _Score_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](8, 20);\nconst lives = new _Lives_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](canvas.width - 65, 20);\nconst sounds = new _SoundManager_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\n\nconst brickRowCount = 5;\nconst brickColumnCount = 8;\nconst brickPadding = 10;\nconst brickOffsetTop = 30;\nconst brickOffsetLeft = 30;\n\n// eslint-disable-next-line max-len\nconst brickWidth = (canvas.width - (brickOffsetLeft * 2) - (brickColumnCount - 1) * brickPadding) / brickColumnCount;\nconst brickHeight = 20;\n\n// Initialize bricks\n// eslint-disable-next-line max-len\nconst bricks = Array.from({ length: brickColumnCount }, (_, c) => Array.from({ length: brickRowCount }, (_, r) => new _Brick_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](\n  c * (brickWidth + brickPadding) + brickOffsetLeft,\n  r * (brickHeight + brickPadding) + brickOffsetTop,\n  brickWidth,\n  brickHeight,\n  ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF69B4'][r % 5],\n)));\n\nconst gameManager = new _GameManager_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"](ball, paddle, bricks, score, lives, canvas, sounds);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/constants.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n\n\n// Event Listeners for Paddle Movement\ndocument.addEventListener('keydown', (e) => _constants_js__WEBPACK_IMPORTED_MODULE_0__.paddle.handleKeyDown(e));\ndocument.addEventListener('keyup', (e) => _constants_js__WEBPACK_IMPORTED_MODULE_0__.paddle.handleKeyUp(e));\ndocument.addEventListener('mousemove', (e) => _constants_js__WEBPACK_IMPORTED_MODULE_0__.paddle.handleMouseMove(e));\n\n/**\n * Main game loop\n */\nfunction gameLoop() {\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.ctx.clearRect(0, 0, _constants_js__WEBPACK_IMPORTED_MODULE_0__.canvas.width, _constants_js__WEBPACK_IMPORTED_MODULE_0__.canvas.height);\n\n  // Render game objects\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.background.render(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ctx, _constants_js__WEBPACK_IMPORTED_MODULE_0__.canvas);\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.paddle.render(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ctx);\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.render(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ctx);\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.score.render(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ctx);\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.lives.render(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ctx);\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.bricks.flat().forEach((brick) => brick.render(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ctx));\n\n  // Ball movement & wall collision\n  if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.x + _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.dx > _constants_js__WEBPACK_IMPORTED_MODULE_0__.canvas.width - _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.radius || _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.x + _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.dx < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.radius) {\n    _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.dx = -_constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.dx;\n  }\n\n  if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.y + _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.dy < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.radius) {\n    _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.dy = -_constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.dy;\n  }\n\n  // Ball hitting the bottom (check game over)\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.gameManager.checkGameOver();\n\n  // Ball-Paddle Collision (Improved)\n  if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.bounceOffPaddle(_constants_js__WEBPACK_IMPORTED_MODULE_0__.paddle)) {\n    _constants_js__WEBPACK_IMPORTED_MODULE_0__.sounds.play('paddleHit'); // Play paddle hit sound\n  }\n\n  // Move ball and paddle\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.ball.move();\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.paddle.move();\n\n  // Check for brick collisions\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.gameManager.collisionDetection();\n\n  // **Win Condition: Check if all bricks are broken**\n  _constants_js__WEBPACK_IMPORTED_MODULE_0__.gameManager.checkWinCondition();\n\n  requestAnimationFrame(gameLoop);\n}\n\n// Start game loop\ngameLoop();\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;