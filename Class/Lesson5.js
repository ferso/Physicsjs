
import Ball from './Ball';
import Graph from './Graph';


export default  class Lesson5 {
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
	  this.init();	 
	 
	 
	}

	resize() {

		this.canvas  = document.getElementById('canvas');		
		this.context = this.canvas.getContext('2d');
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
		this.canvas.width     = 700; window.innerWidth;
		this.canvas.height    = 500; window.innerHeight;	   
	}
	

	init (){
		var graph = new Graph(this.context,-4,4,-10,10,275,210,450,350)
		graph.drawgrid(1,0.2,5,1);
		graph.drawaxes('x','y');
		var xA = new Array();
		var yA = new Array();
		for (var i=0; i<=100; i++){
		     xA[i] = (i-50)*0.08;
		     yA[i] = f(xA[i]);
		}
		graph.plot(xA,yA,'#ff0000',false,true);
		function f(x){
		     var y;
		     // y = 2*x + 1;
		     y = x * x - 2*x - 3;
		     y = -0.5*Math.pow(x,5) + 3*Math.pow(x,3) + x*x - 2*x - 3;
		     return y;
		}


		
	}

	start(){




	}

	
}

