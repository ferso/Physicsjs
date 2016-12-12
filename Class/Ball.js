export default  class Ball {
  constructor(o) {
  	var o		 = o || {};
	this.loop    = null;
	this.radius  = 30;
	this.color   = '#1A1A1A';
	this.x       = o.x || 0;
	this.y       = o.y || 0;
	this.context = o.context || null;	
  }

  draw(){  		

	let gradient = this.context.createRadialGradient(this.x,this.y,2,this.x,this.y,this.radius);
	gradient.addColorStop(0,'#fff');
	gradient.addColorStop(1,'#000');
	this.context.beginPath();
	this.context.fillStyle = gradient;	
	this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
	this.context.closePath();
	this.context.fill();

	return this;
  }
  text(str){  	  
  	  this.context.fillStyle    = "#000";
  	  this.context.font = "bold 30px sans";
	  this.context.textBaseline = "top";
	  this.context.fillText(str, this.x - this.radius / 4 ,this.y - this.radius / 3);
	  return this;
  }
}
