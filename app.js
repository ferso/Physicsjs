(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

class Ball {
  constructor(o) {
  	var o		 = o || {};
	this.loop    = null;
	this.radius  = 20;
	this.color   = '#0000ff';
	this.x       = o.x || 0;
	this.y       = o.y || 0;
	this.context = o.context || null;
	
  }

  draw(){  		
	this.context.fillStyle = this.color;
	this.context.beginPath();
	this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
	this.context.closePath();
	this.context.fill();
  }
  text(str){  	  
  	  this.context.fillStyle    = "#000";
  	  this.context.font = "bold 20px sans";
	  this.context.textBaseline = "top";
	  this.context.fillText(str, this.x-this.radius/4 ,this.y-this.radius/2);
  }
}

export default class App {
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

	  // this.context.clearRect(0,0,this.canvas.width,this.canvas.height );
	  // let Bubble = new Ball({context:this.context,x:this.x,y:this.y}).draw();	  


	}

	
}


new App();
