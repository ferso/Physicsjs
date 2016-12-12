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

	var _Lesson = __webpack_require__(1);

	var _Lesson2 = _interopRequireDefault(_Lesson);

	var _Lesson3 = __webpack_require__(3);

	var _Lesson4 = _interopRequireDefault(_Lesson3);

	var _Lesson5 = __webpack_require__(4);

	var _Lesson6 = _interopRequireDefault(_Lesson5);

	var _Lesson7 = __webpack_require__(5);

	var _Lesson8 = _interopRequireDefault(_Lesson7);

	var _Lesson9 = __webpack_require__(6);

	var _Lesson10 = _interopRequireDefault(_Lesson9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var App = function App() {
		_classCallCheck(this, App);

		var l = new _Lesson10.default();
	};

	exports.default = App;


	new App();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ball = __webpack_require__(2);

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
/* 2 */
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
			this.radius = 30;
			this.color = '#1A1A1A';
			this.x = o.x || 0;
			this.y = o.y || 0;
			this.context = o.context || null;
		}

		_createClass(Ball, [{
			key: 'draw',
			value: function draw() {

				var gradient = this.context.createRadialGradient(this.x, this.y, 2, this.x, this.y, this.radius);
				gradient.addColorStop(0, '#fff');
				gradient.addColorStop(1, '#000');
				this.context.beginPath();
				this.context.fillStyle = gradient;
				this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
				this.context.closePath();
				this.context.fill();

				return this;
			}
		}, {
			key: 'text',
			value: function text(str) {
				this.context.fillStyle = "#000";
				this.context.font = "bold 30px sans";
				this.context.textBaseline = "top";
				this.context.fillText(str, this.x - this.radius / 4, this.y - this.radius / 3);
				return this;
			}
		}]);

		return Ball;
	}();

	exports.default = Ball;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ball = __webpack_require__(2);

	var _Ball2 = _interopRequireDefault(_Ball);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
					var ball = new _Ball2.default();
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

	var Lesson3 = function () {
		function Lesson3() {
			_classCallCheck(this, Lesson3);

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

		_createClass(Lesson3, [{
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

				var gradient1 = this.context.createRadialGradient(330, 250, 5, 350, 250, 50);
				gradient1.addColorStop(0, '#ffffff');
				gradient1.addColorStop(1, '#ff0000');
				this.context.fillStyle = gradient1;
				this.context.arc(350, 250, 50, 0, 2 * Math.PI, true);
				this.context.fill();
			}
		}]);

		return Lesson3;
	}();

	exports.default = Lesson3;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ball = __webpack_require__(2);

	var _Ball2 = _interopRequireDefault(_Ball);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Lesson4 = function () {
		function Lesson4() {
			_classCallCheck(this, Lesson4);

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

		_createClass(Lesson4, [{
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

		return Lesson4;
	}();

	exports.default = Lesson4;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Ball = __webpack_require__(2);

	var _Ball2 = _interopRequireDefault(_Ball);

	var _Graph = __webpack_require__(7);

	var _Graph2 = _interopRequireDefault(_Graph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Lesson5 = function () {
		function Lesson5() {
			_classCallCheck(this, Lesson5);

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

		_createClass(Lesson5, [{
			key: 'resize',
			value: function resize() {

				this.canvas = document.getElementById('canvas');
				this.context = this.canvas.getContext('2d');
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.canvas.width = 700;window.innerWidth;
				this.canvas.height = 500;window.innerHeight;
			}
		}, {
			key: 'init',
			value: function init() {
				var graph = new _Graph2.default(this.context, -4, 4, -10, 10, 275, 210, 450, 350);
				graph.drawgrid(1, 0.2, 5, 1);
				graph.drawaxes('x', 'y');
				var xA = new Array();
				var yA = new Array();
				for (var i = 0; i <= 100; i++) {
					xA[i] = (i - 50) * 0.08;
					yA[i] = f(xA[i]);
				}
				graph.plot(xA, yA, '#ff0000', false, true);
				function f(x) {
					var y;
					// y = 2*x + 1;
					y = x * x - 2 * x - 3;
					y = -0.5 * Math.pow(x, 5) + 3 * Math.pow(x, 3) + x * x - 2 * x - 3;
					return y;
				}
			}
		}, {
			key: 'start',
			value: function start() {}
		}]);

		return Lesson5;
	}();

	exports.default = Lesson5;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Graph = function () {
		function Graph(context, xmin, xmax, ymin, ymax, x0, y0, xwidth, ywidth) {
			_classCallCheck(this, Graph);

			// VARIABLE DECLARATIONS	
			// canvas context on which to draw graph instance 
			this.ctx = context;

			// width and height of textbox used for displaying values on the axes
			// this should not have to be tampered with (I hope)
			this.tw = 15;
			this.th = 20;

			// PARAMETER ASSIGNMENTS	
			// assign parameter values based on specified arguments			
			this.x_orig = x0;
			this.y_orig = y0;
			this.x_width = xwidth;
			this.y_width = ywidth;
			//			
			this.x_displ_scal = (xmax - xmin) / xwidth;
			this.y_displ_scal = (ymax - ymin) / ywidth;
			//		
			this.x_min_rel = xmin / this.x_displ_scal;
			this.x_max_rel = xmax / this.x_displ_scal;
			this.y_min_rel = ymin / this.y_displ_scal;
			this.y_max_rel = ymax / this.y_displ_scal;
			// convert to absolute coordinates				
			this.x_min = this.x_min_rel + this.x_orig;
			this.x_max = this.x_max_rel + this.x_orig;
			this.y_min = this.y_orig - this.y_min_rel;
			this.y_max = this.y_orig - this.y_max_rel;
			this.txpos = this.x_orig - this.tw;
			this.typos = this.y_orig;
		}

		// METHODS	
		// DRAW GRID: draw major, minor lines and display values


		_createClass(Graph, [{
			key: 'drawgrid',
			value: function drawgrid(xmajor, xminor, ymajor, yminor) {

				var x_tick_major = xmajor / this.x_displ_scal;
				var x_tick_minor = xminor / this.x_displ_scal;
				var y_tick_major = ymajor / this.y_displ_scal;
				var y_tick_minor = yminor / this.y_displ_scal;
				// draw major grid lines
				this.ctx.strokeStyle = '#999999';
				this.ctx.lineWidth = 1;
				this.ctx.beginPath();
				this.yy = this.y_max;

				do {
					this.ctx.moveTo(this.x_min, this.yy);
					this.ctx.lineTo(this.x_max, this.yy);
					this.yy += y_tick_major;
				} while (this.yy <= this.y_min);
				this.xx = this.x_min;

				do {
					this.ctx.moveTo(this.xx, this.y_min);
					this.ctx.lineTo(this.xx, this.y_max);
					this.xx += x_tick_major;
				} while (this.xx <= this.x_max);

				this.ctx.stroke();
				// draw minor grid lines			
				this.ctx.strokeStyle = '#cccccc';
				this.ctx.lineWidth = 1;
				this.ctx.beginPath();
				this.yy = this.y_max;

				do {
					this.ctx.moveTo(this.x_min, this.yy);
					this.ctx.lineTo(this.x_max, this.yy);
					this.yy += y_tick_minor;
				} while (this.yy <= this.y_min);
				this.xx = this.x_min;
				do {
					this.ctx.moveTo(this.xx, this.y_min);
					this.ctx.lineTo(this.xx, this.y_max);
					this.xx += x_tick_minor;
				} while (this.xx <= this.x_max);
				this.ctx.stroke();
				//display values
				this.ctx.font = "10pt Arial";
				this.ctx.fillStyle = '#000000';
				this.ctx.textAlign = "right";
				this.ctx.textBaseline = "top";
				this.yy = this.y_max;
				do {
					var y_displ = (this.y_orig - this.yy) * this.y_displ_scal;
					this.ctx.fillText(y_displ, this.txpos + 5, this.yy - this.th / 2);
					this.yy += y_tick_major;
				} while (this.yy <= this.y_min);
				this.ctx.textAlign = "left";
				this.ctx.textBaseline = "top";
				this.xx = this.x_min;
				do {
					var x_displ = (this.xx - this.x_orig) * this.x_displ_scal;
					this.ctx.fillText(x_displ, this.xx - this.tw + 10, this.typos + 5);
					this.xx += x_tick_major;
				} while (this.xx <= this.x_max);
			}
		}, {
			key: 'drawaxes',


			// DRAW AXES: draw axes and labels		
			value: function drawaxes(xlabel, ylabel) {
				if (typeof xlabel === 'undefined') xlabel = 'x';
				if (typeof ylabel === 'undefined') ylabel = 'y';
				this.ctx.strokeStyle = '#000000';
				this.ctx.lineWidth = 2;
				this.ctx.beginPath();
				this.ctx.moveTo(this.x_min, this.y_orig);
				this.ctx.lineTo(this.x_max, this.y_orig);
				this.ctx.moveTo(this.x_orig, this.y_min);
				this.ctx.lineTo(this.x_orig, this.y_max);
				this.ctx.stroke();
				//axis labels
				this.ctx.font = "12pt Arial";
				this.ctx.fillStyle = '#000000';
				this.ctx.textAlign = "left";
				this.ctx.textBaseline = "top";
				this.ctx.fillText(xlabel, this.x_max + 0.75 * this.tw, this.typos - this.th / 2);
				this.ctx.fillText(ylabel, this.txpos + this.tw / 2 + 5, this.y_max - 1.5 * this.th);
			}
		}, {
			key: 'plot',


			// PLOT DATA: plot data
			value: function plot(xArr, yArr, pColor, pDots, pLine) {
				// the last three arguments have default values
				if (typeof pColor === 'undefined') pColor = '#0000ff';
				if (typeof pDots === 'undefined') pDots = true;
				if (typeof pLine === 'undefined') pLine = true;
				var xpos = this.x_orig + xArr[0] / this.x_displ_scal;
				var ypos = this.y_orig - yArr[0] / this.y_displ_scal;
				this.ctx.strokeStyle = pColor;
				this.ctx.lineWidth = 1;
				this.ctx.beginPath();
				this.ctx.moveTo(xpos, ypos);
				this.ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
				for (var i = 1; i < xArr.length; i++) {
					xpos = this.x_orig + xArr[i] / this.x_displ_scal;
					ypos = this.y_orig - yArr[i] / this.y_displ_scal;
					if (pLine) {
						this.ctx.lineTo(xpos, ypos);
					} else {
						this.ctx.moveTo(xpos, ypos);
					}
					if (pDots) {
						this.ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
					}
				}
				this.ctx.stroke();
			}
		}]);

		return Graph;
	}();

	exports.default = Graph;

/***/ }
/******/ ]);