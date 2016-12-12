 export default class Graph {

	constructor(context,xmin,xmax,ymin,ymax,x0,y0,xwidth,ywidth) {
			
		// VARIABLE DECLARATIONS	
		// canvas context on which to draw graph instance 
		this.ctx = context;
		
		// width and height of textbox used for displaying values on the axes
		// this should not have to be tampered with (I hope)
		this.tw = 15;
		this.th = 20;
		
		// PARAMETER ASSIGNMENTS	
		// assign parameter values based on specified arguments			
		 this.x_orig  = x0;
		 this.y_orig  = y0;
		 this.x_width = xwidth;
		 this.y_width = ywidth;
		//			
		this.x_displ_scal = (xmax-xmin)/xwidth;
		this.y_displ_scal = (ymax-ymin)/ywidth;		
		//		
		 this.x_min_rel = xmin/this.x_displ_scal;
		 this.x_max_rel = xmax/this.x_displ_scal;
		 this.y_min_rel = ymin/this.y_displ_scal;
		 this.y_max_rel = ymax/this.y_displ_scal;
		// convert to absolute coordinates				
		 this.x_min = this.x_min_rel + this.x_orig;
		 this.x_max      = this.x_max_rel + this.x_orig;
		 this.y_min      = this.y_orig - this.y_min_rel;
		 this.y_max      = this.y_orig - this.y_max_rel;
		 this.txpos      = this.x_orig - this.tw;
		 this.typos      = this.y_orig;	
	}
	
// METHODS	
	// DRAW GRID: draw major, minor lines and display values
	drawgrid (xmajor,xminor,ymajor,yminor){

		let x_tick_major=xmajor/this.x_displ_scal;
		let x_tick_minor=xminor/this.x_displ_scal;
		let y_tick_major=ymajor/this.y_displ_scal;
		let y_tick_minor=yminor/this.y_displ_scal;
		// draw major grid lines
		this.ctx.strokeStyle = '#999999';
		this.ctx.lineWidth = 1;		
		this.ctx.beginPath() ;			
		this.yy = this.y_max;

		do {
			this.ctx.moveTo(this.x_min,this.yy);
			this.ctx.lineTo(this.x_max,this.yy);
			this.yy += y_tick_major;
		} while (this.yy <= this.y_min);
		this.xx = this.x_min;

		do {
			this.ctx.moveTo(this.xx,this.y_min);
			this.ctx.lineTo(this.xx,this.y_max);
			this.xx+= x_tick_major;
		} while (this.xx <= this.x_max);

		this.ctx.stroke();						
		// draw minor grid lines			
		this.ctx.strokeStyle = '#cccccc';
		this.ctx.lineWidth = 1;	
		this.ctx.beginPath() ;			
		this.yy = this.y_max;
		
		do {
			this.ctx.moveTo(this.x_min,this.yy);
			this.ctx.lineTo(this.x_max,this.yy);
			this.yy+= y_tick_minor;
		} while (this.yy <= this.y_min);
		this.xx=this.x_min;
		do {
			this.ctx.moveTo(this.xx,this.y_min);
			this.ctx.lineTo(this.xx,this.y_max);
			this.xx+= x_tick_minor;
		} while (this.xx <= this.x_max);
		this.ctx.stroke();	
		//display values
		this.ctx.font = "10pt Arial";
		this.ctx.fillStyle = '#000000';
		this.ctx.textAlign = "right";
		this.ctx.textBaseline = "top";		
		this.yy=this.y_max;	
		do {
			let y_displ=(this.y_orig - this.yy) * this.y_displ_scal;
			this.ctx.fillText(y_displ,this.txpos + 5,this.yy - this.th / 2);
			this.yy+= y_tick_major;
		} while (this.yy <= this.y_min);	
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";				
		this.xx=this.x_min;
		do {
			let x_displ=(this.xx - this.x_orig) * this.x_displ_scal;
			this.ctx.fillText(x_displ,this.xx - this.tw + 10,this.typos + 5);			
			this.xx+= x_tick_major;
		} while (this.xx <= this.x_max);				
	};		
		
	// DRAW AXES: draw axes and labels		
	drawaxes (xlabel,ylabel){		
		if(typeof(xlabel)==='undefined') xlabel = 'x';
		if(typeof(ylabel)==='undefined') ylabel = 'y';		
		this.ctx.strokeStyle = '#000000';
		this.ctx.lineWidth = 2;
		this.ctx.beginPath() ;
		this.ctx.moveTo(this.x_min,this.y_orig);
		this.ctx.lineTo(this.x_max,this.y_orig);
		this.ctx.moveTo(this.x_orig,this.y_min);
		this.ctx.lineTo(this.x_orig,this.y_max);
		this.ctx.stroke();
		//axis labels
		this.ctx.font = "12pt Arial";
		this.ctx.fillStyle = '#000000';
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText(xlabel,this.x_max + 0.75 * this.tw,this.typos - this.th / 2);
		this.ctx.fillText(ylabel,this.txpos + this.tw / 2 +5,this.y_max - 1.5 * this.th);
	};		
		
	// PLOT DATA: plot data
	plot (xArr, yArr, pColor, pDots, pLine){
		// the last three arguments have default values
		if(typeof(pColor)==='undefined') pColor = '#0000ff';
		if(typeof(pDots)==='undefined') pDots = true;
		if(typeof(pLine)==='undefined') pLine = true;
		var xpos=this.x_orig+xArr[0]/this.x_displ_scal;
		var ypos=this.y_orig-yArr[0]/this.y_displ_scal;
		this.ctx.strokeStyle = pColor;
		this.ctx.lineWidth = 1;
		this.ctx.beginPath() ;			
		this.ctx.moveTo(xpos,ypos);
		this.ctx.arc(xpos,ypos,1,0,2*Math.PI,true);
		for (var i=1; i<xArr.length; i++){
			xpos=this.x_orig+xArr[i]/this.x_displ_scal;
			ypos=this.y_orig-yArr[i]/this.y_displ_scal;
			if (pLine){
				this.ctx.lineTo(xpos,ypos);				
			}else{
				this.ctx.moveTo(xpos,ypos);
			}
			if (pDots){
				this.ctx.arc(xpos,ypos,1,0,2*Math.PI,true);
			}
		}
		this.ctx.stroke();			
	};	

}