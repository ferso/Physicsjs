/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Lesson = __webpack_require__(2);

	var _Lesson2 = _interopRequireDefault(_Lesson);

	var _Lesson3 = __webpack_require__(3);

	var _Lesson4 = _interopRequireDefault(_Lesson3);

	var _Lesson5 = __webpack_require__(4);

	var _Lesson6 = _interopRequireDefault(_Lesson5);

	var _Lesson7 = __webpack_require__(5);

	var _Lesson8 = _interopRequireDefault(_Lesson7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var App = function App() {
		_classCallCheck(this, App);

		var l = new _Lesson8.default();
	};

	exports.default = App;


	new App();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ball = function () {
		function Ball(o) {
			_classCallCheck(this, Ball);

			var o = o || {};
			this.loop = null;
			this.radius = 20;
			this.color = '#1A1A1A';
			this.x = o.x || 0;
			this.y = o.y || 0;
			this.context = o.context || null;
		}

		_createClass(Ball, [{
			key: 'draw',
			value: function draw() {

				// 	let gradient1 = this.context.createRadialGradient(330,250,5,350,250,50);
				// gradient1.addColorStop(0,'#ffffff');
				// gradient1.addColorStop(1,'#ff0000');
				// this.context.fillStyle = gradient1;
				// this.context.arc(350,250,50,0,2*Math.PI,true);
				// this.context.fill();


				var gradient = this.context.createRadialGradient(this.x, this.y, 5, this.x, this.y, this.radius);
				gradient.addColorStop(0, '#ffffff');
				gradient.addColorStop(1, '#000');
				this.context.fillStyle = gradient;
				this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
				this.context.fill();

				return this;
			}
		}, {
			key: 'text',
			value: function text(str) {
				//   this.context.fillStyle    = "#fff";
				//   this.context.font = "bold 20px sans";
				// this.context.textBaseline = "top";
				// this.context.fillText(str, this.x-this.radius/4 ,this.y-this.radius/2);

				return this;
			}
		}]);

		return Ball;
	}();

	exports.default = Ball;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ball = __webpack_require__(1);

	var _Ball2 = _interopRequireDefault(_Ball);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Lesson1 = function () {
		function Lesson1() {
			_classCallCheck(this, Lesson1);

			this.loop = null;
			this.radius = 20;
			this.color = '#0000ff';

			this.fps = 60;
			// acceleration due to gravity
			this.g = 0.2;
			// initial horizontal speed
			this.vx = 2;
			// initial vertical speed
			this.vy = 0;
			// initial position
			this.x = 0;
			this.y = 0;

			window.addEventListener('resize', this.resize.bind(this));

			this.init();
			this.resize();
		}

		_createClass(Lesson1, [{
			key: 'resize',
			value: function resize() {

				this.canvas = document.getElementById('canvas');
				this.context = this.canvas.getContext('2d');
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
			}
		}, {
			key: 'init',
			value: function init() {

				window.addEventListener('mousedown', function (e) {
					this.x = e.clientX;
					this.y = e.clientY;
					if (this.loop) clearInterval(this.loop);
					this.loop = setInterval(this.start.bind(this), 1000 / this.fps);
					this.start();
				}.bind(this));
			}
		}, {
			key: 'onEachStep',
			value: function onEachStep() {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				for (var i = 0; i < this.numBalls; i++) {
					var ball = this.balls[i];
					ball.vy += this.g;
					ball.x += ball.vx;
					ball.y += ball.vy;
					if (ball.y > this.canvas.height - this.radius) {
						ball.y = this.canvas.height - this.radius;
						ball.vy *= -0.8;
					}
					if (ball.x > this.canvas.width + this.radius) {
						ball.x = -this.radius;
					}
					ball.draw();
					ball.text(i);
				}
			}
		}, {
			key: 'start',
			value: function start() {

				// gravity increases the vertical speed
				this.vy += Math.ceil(this.g);
				// console.log(this.vy);
				// horizontal speed increases horizontal position
				this.x -= this.vx;
				// vertical speed increases vertical position
				this.y += this.vy;

				// if ball hits the ground
				if (this.y > this.canvas.height - this.radius) {
					// reposition it at the ground
					this.y = this.canvas.height - this.radius;
					// then reverse and reduce its vertical speed
					this.vy *= -0.8;
				}

				if (this.x < 0) {
					// wrap it around
					this.x = this.canvas.width + this.radius; //this.radius;
				}

				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				var Bubble = new _Ball2.default({ context: this.context, x: this.x, y: this.y }).draw().text(1);
			}
		}]);

		return Lesson1;
	}();

	exports.default = Lesson1;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Lesson2 = function () {
		function Lesson2() {
			_classCallCheck(this, Lesson2);

			this.loop = null;
			this.radius = 20;
			this.color = '#0000ff';

			this.fps = 60;
			// acceleration due to gravity
			this.g = 0.2;
			// initial horizontal speed
			this.vx = 2;
			// initial vertical speed
			this.vy = 0;
			// initial position
			this.x = 0;
			this.y = 0;

			window.addEventListener('resize', this.resize.bind(this));

			this.resize();

			this.startBalls();
		}

		_createClass(Lesson2, [{
			key: 'resize',
			value: function resize() {

				this.canvas = document.getElementById('canvas');
				this.context = this.canvas.getContext('2d');
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
			}
		}, {
			key: 'init',
			value: function init() {

				window.addEventListener('mousedown', function (e) {
					this.x = e.clientX;
					this.y = e.clientY;
					if (this.loop) clearInterval(this.loop);
					this.loop = setInterval(this.start.bind(this), 1000 / this.fps);
					this.start();
				}.bind(this));
			}
		}, {
			key: 'onEachStep',
			value: function onEachStep() {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				for (var i = 0; i < this.numBalls; i++) {
					var ball = this.balls[i];
					ball.vy += this.g;
					ball.x += ball.vx;
					ball.y += ball.vy;
					if (ball.y > this.canvas.height - this.radius) {
						ball.y = this.canvas.height - this.radius;
						ball.vy *= -0.8;
					}
					if (ball.x > this.canvas.width + this.radius) {
						ball.x = -this.radius;
					}
					ball.draw();
					ball.text(i);
				}
			}
		}, {
			key: 'startBalls',
			value: function startBalls() {

				this.numBalls = 10;
				this.balls = new Array();
				for (var i = 0; i < this.numBalls; i++) {
					var ball = new Ball();
					ball.context = this.context;
					ball.x = 50;
					ball.y = 75;
					ball.vx = Math.random() * 5;
					ball.vy = (Math.random() - 0.5) * 4;
					this.balls.push(ball);
				};

				this.loop = setInterval(this.onEachStep.bind(this), 1000 / this.fps);
			}
		}, {
			key: 'start',
			value: function start() {

				// gravity increases the vertical speed
				this.vy += Math.ceil(this.g);
				// console.log(this.vy);
				// horizontal speed increases horizontal position
				this.x += this.vx;
				// vertical speed increases vertical position
				this.y += this.vy;

				// if ball hits the ground
				if (this.y > this.canvas.height - this.radius) {
					// reposition it at the ground
					this.y = this.canvas.height - this.radius;
					// then reverse and reduce its vertical speed
					this.vy *= -0.8;
				}

				if (this.x >= this.canvas.width + this.radious) {
					console.log('here');
					// wrap it around
					x = -radius;
				}

				// this.context.clearRect(0,0,this.canvas.width,this.canvas.height );
				// let Bubble = new Ball({context:this.context,x:this.x,y:this.y}).draw();	  

			}
		}]);

		return Lesson2;
	}();

	exports.default = Lesson2;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Lesson2 = function () {
		function Lesson2() {
			_classCallCheck(this, Lesson2);

			this.loop = null;
			this.radius = 20;
			this.color = '#0000ff';

			this.fps = 60;
			// acceleration due to gravity
			this.g = 0.2;
			// initial horizontal speed
			this.vx = 2;
			// initial vertical speed
			this.vy = 0;
			// initial position
			this.x = 0;
			this.y = 0;

			window.addEventListener('resize', this.resize.bind(this));

			this.resize();

			this.init();
		}

		_createClass(Lesson2, [{
			key: 'resize',
			value: function resize() {

				this.canvas = document.getElementById('canvas');
				this.context = this.canvas.getContext('2d');
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
			}
		}, {
			key: 'init',
			value: function init() {

				// this.context.strokeStyle = '#0000ff';
				// this.context.lineWidth = 2;
				// this.context.beginPath() ;
				// this.context.moveTo(50, 50);
				// this.context.lineTo(150, 50);
				// this.context.lineTo(150, 200);
				// this.context.lineTo(50, 200);
				// this.context.lineTo(50, 50);
				// this.context.stroke();
				// this.context.fillStyle = '#00ff00';
				// this.context.fill();

				// this.context.fillRect(250,50,150,100);
				// let gradient = this.context.createLinearGradient(0,0,0,500);
				// 	gradient.addColorStop(0,'#ffffff');
				// 	gradient.addColorStop(1,'#0000ff');
				// this.context.fillStyle = gradient;
				// this.context.fillRect(0,0,700,500);

				var gradient1 = this.context.createRadialGradient(330, 250, 5, 350, 250, 100);
				gradient1.addColorStop(0, '#ffffff');
				gradient1.addColorStop(1, '#ff0000');
				this.context.fillStyle = gradient1;
				this.context.arc(350, 250, 50, 0, 2 * Math.PI, true);
				this.context.fill();
			}
		}]);

		return Lesson2;
	}();

	exports.default = Lesson2;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ball = __webpack_require__(1);

	var _Ball2 = _interopRequireDefault(_Ball);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Lesson1 = function () {
		function Lesson1() {
			_classCallCheck(this, Lesson1);

			this.loop = null;
			this.radius = 20;
			this.color = '#0000ff';

			this.fps = 60;
			// acceleration due to gravity
			this.g = 0.2;
			// initial horizontal speed
			this.vx = 2;
			// initial vertical speed
			this.vy = 0;
			// initial position
			this.x = 0;
			this.y = 0;

			window.addEventListener('resize', this.resize.bind(this));

			this.init();
			this.resize();
		}

		_createClass(Lesson1, [{
			key: 'resize',
			value: function resize() {

				this.canvas = document.getElementById('canvas');
				this.context = this.canvas.getContext('2d');
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
			}
		}, {
			key: 'init',
			value: function init() {

				window.addEventListener('mousedown', function (e) {
					this.x = e.clientX;
					this.y = e.clientY;
					if (this.loop) clearInterval(this.loop);
					requestAnimationFrame(this.start.bind(this));
					this.loop = setInterval(this.start.bind(this), 1000 / this.fps);
					this.start();
				}.bind(this));
			}
		}, {
			key: 'start',
			value: function start() {

				// gravity increases the vertical speed
				this.vy += Math.ceil(this.g);
				// console.log(this.vy);
				// horizontal speed increases horizontal position
				this.x -= this.vx;
				// vertical speed increases vertical position
				this.y += this.vy;

				// if ball hits the ground
				if (this.y > this.canvas.height - this.radius) {
					// reposition it at the ground
					this.y = this.canvas.height - this.radius;
					// then reverse and reduce its vertical speed
					this.vy *= -0.8;
				}

				if (this.x < 0) {
					// wrap it around
					this.x = this.canvas.width + this.radius; //this.radius;
				}

				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				var Bubble = new _Ball2.default({ context: this.context, x: this.x, y: this.y }).draw().text(1);
			}
		}]);

		return Lesson1;
	}();

	exports.default = Lesson1;

/***/ }
/******/ ]);