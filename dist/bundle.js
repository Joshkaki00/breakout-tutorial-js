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

/***/ "./src/Background.ts":
/*!***************************!*\
  !*** ./src/Background.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Background = /** @class */ (function () {\n    function Background(color1, color2) {\n        this.color1 = color1;\n        this.color2 = color2;\n    }\n    Background.prototype.render = function (ctx, canvas) {\n        var gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 50, canvas.width / 2, canvas.height / 2, canvas.width);\n        gradient.addColorStop(0, this.color1);\n        gradient.addColorStop(1, this.color2);\n        ctx.fillStyle = gradient;\n        ctx.fillRect(0, 0, canvas.width, canvas.height);\n    };\n    return Background;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Background);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Background.ts?");

/***/ }),

/***/ "./src/Ball.ts":
/*!*********************!*\
  !*** ./src/Ball.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Ball = /** @class */ (function (_super) {\n    __extends(Ball, _super);\n    function Ball(x, y, radius, dx, dy, color, maxSpeed) {\n        if (color === void 0) { color = \"#FFD700\"; }\n        if (maxSpeed === void 0) { maxSpeed = 5; }\n        var _this = _super.call(this, x, y, radius * 2, radius * 2, color) || this;\n        _this.radius = radius;\n        _this.dx = dx;\n        _this.dy = dy;\n        _this.baseSpeed = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));\n        _this.maxSpeed = maxSpeed;\n        return _this;\n    }\n    Ball.prototype.move = function () {\n        this.x += this.dx;\n        this.y += this.dy;\n    };\n    Ball.prototype.increaseSpeed = function (score) {\n        var speedFactor = 1 + score * 0.001;\n        var newSpeed = Math.min(this.maxSpeed, this.baseSpeed * speedFactor);\n        var angle = Math.atan2(this.dy, this.dx);\n        this.dx = newSpeed * Math.cos(angle);\n        this.dy = newSpeed * Math.sin(angle);\n    };\n    Ball.prototype.bounceOffPaddle = function (paddle) {\n        var relativeIntersectX = this.x - (paddle.x + paddle.width / 2);\n        var normalizedRelativeIntersectX = relativeIntersectX / (paddle.width / 2);\n        if (Math.abs(normalizedRelativeIntersectX) < 0.2) {\n            this.dy = -Math.abs(this.dy);\n        }\n        else {\n            var bounceAngle = normalizedRelativeIntersectX * (Math.PI / 3);\n            var speed = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));\n            this.dx = speed * Math.cos(bounceAngle);\n            this.dy = -Math.abs(speed * Math.sin(bounceAngle));\n        }\n        return true;\n    };\n    return Ball;\n}(_sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ball);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Ball.ts?");

/***/ }),

/***/ "./src/Brick.ts":
/*!**********************!*\
  !*** ./src/Brick.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Brick = /** @class */ (function (_super) {\n    __extends(Brick, _super);\n    function Brick(x, y, width, height, color, status) {\n        if (status === void 0) { status = true; }\n        var _this = _super.call(this, x, y, width, height, color) || this;\n        _this.status = status;\n        return _this;\n    }\n    return Brick;\n}(_sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Brick);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Brick.ts?");

/***/ }),

/***/ "./src/GameManager.ts":
/*!****************************!*\
  !*** ./src/GameManager.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar GameManager = /** @class */ (function () {\n    function GameManager(ball, paddle, bricks, score, lives, sounds, canvas, ctx) {\n        var _this = this;\n        this.ball = ball;\n        this.paddle = paddle;\n        this.bricks = bricks;\n        this.score = score;\n        this.lives = lives;\n        this.sounds = sounds;\n        this.canvas = canvas;\n        this.ctx = ctx;\n        this.isGameOver = false;\n        this.isPaused = false;\n        document.addEventListener(\"keydown\", function (e) { return _this.handlePause(e); });\n        this.sounds.startBackgroundMusic();\n        this.flatBricks = this.bricks.flat(); // Optimized flattening\n    }\n    GameManager.prototype.handlePause = function (e) {\n        if (e.key === \"p\" || e.key === \"P\") {\n            this.isPaused = !this.isPaused;\n            if (this.isPaused) {\n                this.sounds.stopBackgroundMusic();\n            }\n            else {\n                this.sounds.startBackgroundMusic();\n            }\n        }\n    };\n    GameManager.prototype.checkGameOver = function () {\n        if (this.isPaused || this.isGameOver)\n            return;\n        if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {\n            if (this.ball.bounceOffPaddle(this.paddle)) {\n                this.sounds.play(\"paddleHit\");\n            }\n            else {\n                this.lives.loseLife();\n                this.sounds.play(\"ballMiss\");\n                if (this.lives.lives === 0) {\n                    this.sounds.stopBackgroundMusic();\n                    this.sounds.play(\"gameOver\");\n                    this.isGameOver = true;\n                    alert(\"GAME OVER\");\n                }\n                else {\n                    this.resetBall();\n                }\n            }\n        }\n    };\n    GameManager.prototype.resetBall = function () {\n        this.ball.x = this.paddle.x + this.paddle.width / 2;\n        this.ball.y = this.paddle.y - this.ball.radius - 5;\n        this.ball.dx = 2 * (Math.random() < 0.5 ? 1 : -1);\n        this.ball.dy = -2;\n    };\n    GameManager.prototype.collisionDetection = function () {\n        var _this = this;\n        var hitBrick = false;\n        this.flatBricks.forEach(function (brick) {\n            if (brick.status &&\n                _this.ball.x > brick.x &&\n                _this.ball.x < brick.x + brick.width &&\n                _this.ball.y > brick.y &&\n                _this.ball.y < brick.y + brick.height) {\n                _this.ball.dy = -_this.ball.dy;\n                brick.status = false;\n                _this.score.update(10);\n                hitBrick = true;\n            }\n        });\n        if (hitBrick) {\n            this.ball.increaseSpeed(this.score.score);\n            this.sounds.play(\"brickHit\");\n        }\n    };\n    GameManager.prototype.checkWinCondition = function () {\n        if (this.flatBricks.every(function (brick) { return !brick.status; })) {\n            this.sounds.play(\"win\");\n            alert(\"YOU WIN!\");\n            this.isGameOver = true;\n        }\n    };\n    return GameManager;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameManager);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/GameManager.ts?");

/***/ }),

/***/ "./src/Lives.ts":
/*!**********************!*\
  !*** ./src/Lives.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Lives = /** @class */ (function () {\n    function Lives(x, y, color, font, lives) {\n        if (color === void 0) { color = \"#0095DD\"; }\n        if (font === void 0) { font = \"16px Arial\"; }\n        if (lives === void 0) { lives = 3; }\n        this.x = x;\n        this.y = y;\n        this.color = color;\n        this.font = font;\n        this.lives = lives;\n    }\n    Lives.prototype.loseLife = function () {\n        this.lives -= 1;\n    };\n    Lives.prototype.reset = function () {\n        this.lives = 3;\n    };\n    Lives.prototype.render = function (ctx) {\n        ctx.font = this.font;\n        ctx.fillStyle = this.color;\n        ctx.fillText(\"Lives: \".concat(this.lives), this.x, this.y);\n    };\n    return Lives;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lives);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Lives.ts?");

/***/ }),

/***/ "./src/Paddle.ts":
/*!***********************!*\
  !*** ./src/Paddle.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar Paddle = /** @class */ (function (_super) {\n    __extends(Paddle, _super);\n    function Paddle(x, y, width, height, canvas, color) {\n        if (color === void 0) { color = \"#40E0D0\"; }\n        var _this = _super.call(this, x, y, width, height, color) || this;\n        _this.speed = 7;\n        _this.rightPressed = false;\n        _this.leftPressed = false;\n        _this.canvas = canvas;\n        document.addEventListener(\"keydown\", function (e) { return _this.handleKeyDown(e); });\n        document.addEventListener(\"keyup\", function (e) { return _this.handleKeyUp(e); });\n        _this.canvas.addEventListener(\"mousemove\", function (e) { return _this.handleMouseMove(e); });\n        return _this;\n    }\n    Paddle.prototype.handleKeyDown = function (e) {\n        if (e.key === \"Right\" || e.key === \"ArrowRight\") {\n            this.rightPressed = true;\n        }\n        else if (e.key === \"Left\" || e.key === \"ArrowLeft\") {\n            this.leftPressed = true;\n        }\n    };\n    Paddle.prototype.handleKeyUp = function (e) {\n        if (e.key === \"Right\" || e.key === \"ArrowRight\") {\n            this.rightPressed = false;\n        }\n        else if (e.key === \"Left\" || e.key === \"ArrowLeft\") {\n            this.leftPressed = false;\n        }\n    };\n    Paddle.prototype.handleMouseMove = function (e) {\n        var relativeX = e.clientX - this.canvas.offsetLeft;\n        if (relativeX > 0 && relativeX < this.canvas.width) {\n            this.x = relativeX - this.width / 2;\n        }\n    };\n    Paddle.prototype.move = function () {\n        if (this.rightPressed) {\n            this.x = Math.min(this.x + this.speed, this.canvas.width - this.width);\n        }\n        else if (this.leftPressed) {\n            this.x = Math.max(this.x - this.speed, 0);\n        }\n    };\n    return Paddle;\n}(_sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Paddle);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Paddle.ts?");

/***/ }),

/***/ "./src/Score.ts":
/*!**********************!*\
  !*** ./src/Score.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Score = /** @class */ (function () {\n    function Score(x, y, color, font, score) {\n        if (color === void 0) { color = \"#0095DD\"; }\n        if (font === void 0) { font = \"16px Arial\"; }\n        if (score === void 0) { score = 0; }\n        this.x = x;\n        this.y = y;\n        this.color = color;\n        this.font = font;\n        this.score = score;\n    }\n    Score.prototype.update = function (points) {\n        this.score += points;\n    };\n    Score.prototype.reset = function () {\n        this.score = 0;\n    };\n    Score.prototype.render = function (ctx) {\n        ctx.font = this.font;\n        ctx.fillStyle = this.color;\n        ctx.fillText(\"Score: \".concat(this.score), this.x, this.y);\n    };\n    return Score;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Score);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/Score.ts?");

/***/ }),

/***/ "./src/SoundManager.ts":
/*!*****************************!*\
  !*** ./src/SoundManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar SoundManager = /** @class */ (function () {\n    function SoundManager() {\n        this.sounds = {\n            brickHit: new Audio(\"assets/sounds/brick-hit.mp3\"),\n            paddleHit: new Audio(\"assets/sounds/paddle-hit.mp3\"),\n            gameOver: new Audio(\"assets/sounds/game-over.mp3\"),\n            ballMiss: new Audio(\"assets/sounds/ball-miss.mp3\"),\n            win: new Audio(\"assets/sounds/win.mp3\"),\n            backgroundMusic: new Audio(\"assets/sounds/background-music.mp3\"),\n        };\n        this.sounds.backgroundMusic.loop = true;\n        this.sounds.backgroundMusic.volume = 0.3;\n    }\n    SoundManager.prototype.play = function (name) {\n        if (this.sounds[name]) {\n            this.sounds[name].pause();\n            this.sounds[name].currentTime = 0;\n            this.sounds[name].play();\n        }\n    };\n    SoundManager.prototype.startBackgroundMusic = function () {\n        this.sounds.backgroundMusic.play();\n    };\n    SoundManager.prototype.stopBackgroundMusic = function () {\n        this.sounds.backgroundMusic.pause();\n    };\n    return SoundManager;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SoundManager);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/SoundManager.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   background: () => (/* binding */ background),\n/* harmony export */   ball: () => (/* binding */ ball),\n/* harmony export */   brickColumnCount: () => (/* binding */ brickColumnCount),\n/* harmony export */   brickHeight: () => (/* binding */ brickHeight),\n/* harmony export */   brickOffsetLeft: () => (/* binding */ brickOffsetLeft),\n/* harmony export */   brickOffsetTop: () => (/* binding */ brickOffsetTop),\n/* harmony export */   brickPadding: () => (/* binding */ brickPadding),\n/* harmony export */   brickRowCount: () => (/* binding */ brickRowCount),\n/* harmony export */   brickWidth: () => (/* binding */ brickWidth),\n/* harmony export */   bricks: () => (/* binding */ bricks),\n/* harmony export */   canvas: () => (/* binding */ canvas),\n/* harmony export */   ctx: () => (/* binding */ ctx),\n/* harmony export */   gameManager: () => (/* binding */ gameManager),\n/* harmony export */   lives: () => (/* binding */ lives),\n/* harmony export */   paddle: () => (/* binding */ paddle),\n/* harmony export */   score: () => (/* binding */ score),\n/* harmony export */   sounds: () => (/* binding */ sounds)\n/* harmony export */ });\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball */ \"./src/Ball.ts\");\n/* harmony import */ var _Paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Paddle */ \"./src/Paddle.ts\");\n/* harmony import */ var _Background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Background */ \"./src/Background.ts\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Score */ \"./src/Score.ts\");\n/* harmony import */ var _Lives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Lives */ \"./src/Lives.ts\");\n/* harmony import */ var _Brick__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Brick */ \"./src/Brick.ts\");\n/* harmony import */ var _GameManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GameManager */ \"./src/GameManager.ts\");\n/* harmony import */ var _SoundManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SoundManager */ \"./src/SoundManager.ts\");\n\n\n\n\n\n\n\n\n/* eslint-disable no-undef */\nvar canvas = document.getElementById('myCanvas');\nvar ctx = canvas.getContext('2d');\nvar ball = new _Ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas.width / 2, canvas.height - 30, 10, 2, -2, '#FFD700', 5);\nvar paddle = new _Paddle__WEBPACK_IMPORTED_MODULE_1__[\"default\"]((canvas.width - 75) / 2, canvas.height - 10, 75, 10, canvas);\nvar background = new _Background__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('#8A2BE2', '#000000');\nvar score = new _Score__WEBPACK_IMPORTED_MODULE_3__[\"default\"](8, 20);\nvar lives = new _Lives__WEBPACK_IMPORTED_MODULE_4__[\"default\"](canvas.width - 65, 20);\nvar sounds = new _SoundManager__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\nvar brickRowCount = 5;\nvar brickColumnCount = 8;\nvar brickPadding = 10;\nvar brickOffsetTop = 30;\nvar brickOffsetLeft = 30;\n// eslint-disable-next-line max-len\nvar brickWidth = (canvas.width - (brickOffsetLeft * 2) - (brickColumnCount - 1) * brickPadding) / brickColumnCount;\nvar brickHeight = 20;\n// Initialize bricks\n// eslint-disable-next-line max-len\nvar bricks = Array.from({ length: brickColumnCount }, function (_, c) { return Array.from({ length: brickRowCount }, function (_, r) { return new _Brick__WEBPACK_IMPORTED_MODULE_5__[\"default\"](c * (brickWidth + brickPadding) + brickOffsetLeft, r * (brickHeight + brickPadding) + brickOffsetTop, brickWidth, brickHeight, ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF69B4'][r % 5]); }); });\nvar gameManager = new _GameManager__WEBPACK_IMPORTED_MODULE_6__[\"default\"](ball, paddle, bricks, score, lives, canvas, sounds);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/constants.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n\n// Event Listeners for Paddle Movement\ndocument.addEventListener('keydown', function (e) { return _constants__WEBPACK_IMPORTED_MODULE_0__.paddle.handleKeyDown(e); });\ndocument.addEventListener('keyup', function (e) { return _constants__WEBPACK_IMPORTED_MODULE_0__.paddle.handleKeyUp(e); });\ndocument.addEventListener('mousemove', function (e) { return _constants__WEBPACK_IMPORTED_MODULE_0__.paddle.handleMouseMove(e); });\n/**\n * Main game loop\n */\nfunction gameLoop() {\n    _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.clearRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_0__.canvas.width, _constants__WEBPACK_IMPORTED_MODULE_0__.canvas.height);\n    // Render game objects\n    _constants__WEBPACK_IMPORTED_MODULE_0__.background.render(_constants__WEBPACK_IMPORTED_MODULE_0__.ctx, _constants__WEBPACK_IMPORTED_MODULE_0__.canvas);\n    _constants__WEBPACK_IMPORTED_MODULE_0__.paddle.render(_constants__WEBPACK_IMPORTED_MODULE_0__.ctx);\n    _constants__WEBPACK_IMPORTED_MODULE_0__.ball.render(_constants__WEBPACK_IMPORTED_MODULE_0__.ctx);\n    _constants__WEBPACK_IMPORTED_MODULE_0__.score.render(_constants__WEBPACK_IMPORTED_MODULE_0__.ctx);\n    _constants__WEBPACK_IMPORTED_MODULE_0__.lives.render(_constants__WEBPACK_IMPORTED_MODULE_0__.ctx);\n    _constants__WEBPACK_IMPORTED_MODULE_0__.bricks.flat().forEach(function (brick) { return brick.render(_constants__WEBPACK_IMPORTED_MODULE_0__.ctx); });\n    // Ball movement & wall collision\n    if (_constants__WEBPACK_IMPORTED_MODULE_0__.ball.x + _constants__WEBPACK_IMPORTED_MODULE_0__.ball.dx > _constants__WEBPACK_IMPORTED_MODULE_0__.canvas.width - _constants__WEBPACK_IMPORTED_MODULE_0__.ball.radius || _constants__WEBPACK_IMPORTED_MODULE_0__.ball.x + _constants__WEBPACK_IMPORTED_MODULE_0__.ball.dx < _constants__WEBPACK_IMPORTED_MODULE_0__.ball.radius) {\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ball.dx = -_constants__WEBPACK_IMPORTED_MODULE_0__.ball.dx;\n    }\n    if (_constants__WEBPACK_IMPORTED_MODULE_0__.ball.y + _constants__WEBPACK_IMPORTED_MODULE_0__.ball.dy < _constants__WEBPACK_IMPORTED_MODULE_0__.ball.radius) {\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ball.dy = -_constants__WEBPACK_IMPORTED_MODULE_0__.ball.dy;\n    }\n    // Ball hitting the bottom (check game over)\n    _constants__WEBPACK_IMPORTED_MODULE_0__.gameManager.checkGameOver();\n    // Ball-Paddle Collision (Improved)\n    if (_constants__WEBPACK_IMPORTED_MODULE_0__.ball.bounceOffPaddle(_constants__WEBPACK_IMPORTED_MODULE_0__.paddle)) {\n        _constants__WEBPACK_IMPORTED_MODULE_0__.sounds.play('paddleHit'); // Play paddle hit sound\n    }\n    // Move ball and paddle\n    _constants__WEBPACK_IMPORTED_MODULE_0__.ball.move();\n    _constants__WEBPACK_IMPORTED_MODULE_0__.paddle.move();\n    // Check for brick collisions\n    _constants__WEBPACK_IMPORTED_MODULE_0__.gameManager.collisionDetection();\n    // **Win Condition: Check if all bricks are broken**\n    _constants__WEBPACK_IMPORTED_MODULE_0__.gameManager.checkWinCondition();\n    requestAnimationFrame(gameLoop);\n}\n// Start game loop\ngameLoop();\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/main.ts?");

/***/ }),

/***/ "./src/sprite.ts":
/*!***********************!*\
  !*** ./src/sprite.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Sprite = /** @class */ (function () {\n    function Sprite(x, y, width, height, color) {\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.color = color;\n    }\n    Sprite.prototype.render = function (ctx) {\n        ctx.fillStyle = this.color;\n        ctx.fillRect(this.x, this.y, this.width, this.height);\n    };\n    return Sprite;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sprite);\n\n\n//# sourceURL=webpack://break-out-tutorial/./src/sprite.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;