default export class Ball {
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