export default  class Ball {
  constructor(o) {
  	var o		 = o || {};
	this.loop    = null;
	this.radius  = 20;
	this.color   = '#1A1A1A';
	this.x       = o.x || 0;
	this.y       = o.y || 0;
	this.context = o.context || null;	
  }

  draw(){  		

  // 	let gradient1 = this.context.createRadialGradient(330,250,5,350,250,50);
		// gradient1.addColorStop(0,'#ffffff');
		// gradient1.addColorStop(1,'#ff0000');
		// this.context.fillStyle = gradient1;
		// this.context.arc(350,250,50,0,2*Math.PI,true);
		// this.context.fill();


	let gradient = this.context.createRadialGradient(this.x,this.y,5,this.x,this.y,this.radius);
	gradient.addColorStop(0,'#ffffff');
	gradient.addColorStop(1,'#000');
	this.context.fillStyle = gradient;	
	this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,true);	
	this.context.fill();

	return this;
  }
  text(str){  	  
  	//   this.context.fillStyle    = "#fff";
  	//   this.context.font = "bold 20px sans";
	  // this.context.textBaseline = "top";
	  // this.context.fillText(str, this.x-this.radius/4 ,this.y-this.radius/2);

	  return this;
  }
}
