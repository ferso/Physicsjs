import Ball from './Ball';

export default class Lesson2 {
	constructor() {

	  this.loop   = null;
	  this.radius = 20;
	  this.color  = '#0000ff';

	  this.fps 	  = 60;
	  // acceleration due to gravity
	  this.g 	  = 0.2;
	  // initial horizontal speed
	  this.vx     = 2;
	  // initial vertical speed
	  this.vy     = 0;
	  // initial position
	  this.x      = 0;
	  this.y      = 0;

	  window.addEventListener('resize', this.resize.bind(this) );
	  
	  this.resize();
	  
	  this.startBalls();
	 
	}

	resize() {

		this.canvas  = document.getElementById('canvas');		
		this.context = this.canvas.getContext('2d');
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
		this.canvas.width     = window.innerWidth;
		this.canvas.height    = window.innerHeight;	   
	}

	init (){
		
		window.addEventListener('mousedown', function(e){
			this.x = e.clientX;
			this.y = e.clientY;
			if( this.loop ) clearInterval(this.loop);
			this.loop = setInterval(this.start.bind(this),1000/this.fps);
			this.start();

		}.bind(this));

	}

	onEachStep() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (var i=0; i< this.numBalls; i++){
			var ball = this.balls[i];
			ball.vy += this.g;
			ball.x += ball.vx;
			ball.y += ball.vy;
			if (ball.y > this.canvas.height - this.radius){
			   ball.y = this.canvas.height - this.radius;
			   ball.vy *= -0.8;
			}
			if (ball.x > this.canvas.width + this.radius){
			   ball.x = -this.radius;
			}
		  ball.draw();
		  ball.text(i);
		}
	};


	startBalls (){

		this.numBalls = 10;
		this.balls = new Array();
		for (var i=0; i< this.numBalls; i++) {
		  	 var ball = new Ball();
		  	  ball.context = this.context;
		  	  ball.x  = 50;
		  	  ball.y  = 75;
		  	  ball.vx = Math.random()*5;
		  	  ball.vy = (Math.random()-0.5)*4;
		  	  this.balls.push(ball);
		};

		this.loop = setInterval(this.onEachStep.bind(this),1000/this.fps);

	}
	start(){

		
		// gravity increases the vertical speed
		this.vy += Math.ceil(this.g); 
		// console.log(this.vy);
		// horizontal speed increases horizontal position
		this.x  += this.vx;
		// vertical speed increases vertical position
		this.y  += this.vy;

		// if ball hits the ground
		if( this.y > this.canvas.height - this.radius ){
			// reposition it at the ground
			this.y = this.canvas.height - this.radius
			// then reverse and reduce its vertical speed
			this.vy *= -0.8;
		}
		
		if( this.x >= this.canvas.width + this.radious ){
			console.log('here');
			// wrap it around
			x = -radius;
		}

	}

	
}