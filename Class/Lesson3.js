
export default class Lesson3 {
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
		this.canvas.width     = window.innerWidth;
		this.canvas.height    = window.innerHeight;	   
	}

	init (){
		
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

		let gradient1 = this.context.createRadialGradient(330,250,5,350,250,50);
		gradient1.addColorStop(0,'#ffffff');
		gradient1.addColorStop(1,'#ff0000');
		this.context.fillStyle = gradient1;
		this.context.arc(350,250,50,0,2*Math.PI,true);
		this.context.fill();


	}
	
}