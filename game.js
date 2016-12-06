
(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel
	// MIT license

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


class Sprite {

	constructor(options) {
	 	this.frameIndex 		= 0;
		this.tickCount 		= 0;
		this.ticksPerFrame 	= 4;
		this.numberOfFrames  = options.nof || 10;
		this.fps 				= 120;
		this.interval 			= null;
		this.xpos				= options.xpos || 0;
		this.ypos 				= options.ypos || 0;		
		this.context 			= options.context;
		this.image 			   = options.image;
		this.width 				= options.width;
		this.height 			= options.height;
		this.start();
	}

	start(){
		window.requestAnimationFrame(this.start.bind(this));			
		this.update();
		this.render();
	}

	update(){
	  this.tickCount += 1;
	   if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;		       
	       if (this.frameIndex < this.numberOfFrames - 1) {		           
	           this.frameIndex += 1;
	       } else {
	           this.frameIndex = 0;
	       }
	   }
	}

	render(){
		  // Clear the canvas
		  this.context.clearRect( this.xpos, this.ypos,(this.frameIndex * this.width / this.numberOfFrames) , this.height);
 		  
		  // Draw the animation
		  this.context.drawImage(
		    this.image,
		    (this.frameIndex * this.width / this.numberOfFrames),
		    0,
		    (this.width / this.numberOfFrames)  ,
		    this.height,
		    this.xpos,
		    this.ypos,
		    (this.width / this.numberOfFrames),
		    this.height);
	}
}

export default class Game {

	constructor(props) {	  	

		this.a       = 0;
		this.initx   = 0;
		this.inity   = 0;		
		this.sTick   = 9;
		this.images  = {};    
    	this.jumping = false;
    	this.actions = ['Idle','Attack','Jump','Jump_Attack','Run','Slide','Throw'];
    	this.action = 'Idle';
	 	this.init();	 	

	}

	/*
	---------------------------------------------------- */
	init (){
		var that     = this;
		this.canvas  = document.getElementById('canvas');		
      this.context = this.canvas.getContext('2d');
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.xpos = this.initx;

	   window.addEventListener('resize', this.resize.bind(this) );	 
	   document.addEventListener('keydown', this.keydown.bind(this) );
	   document.addEventListener('keyup', this.keyup.bind(this) ); 
	   this.snd = new Audio(); 
	   this.snd.play();
	   this.resize();	   
	}

	drawShadow(centerX, centerY, width, height) {
        
          this.context.beginPath(); 
          this.context.moveTo(centerX, centerY - height/2);          
          this.context.bezierCurveTo(
            centerX + width/2, centerY - height/2,
            centerX + width/2, centerY + height/2,
            centerX, centerY + height/2);
          this.context.bezierCurveTo(
            centerX - width/2, centerY + height/2,
            centerX - width/2, centerY - height/2,
            centerX, centerY - height/2);
         
          this.context.fillStyle = "gray";
          this.context.fill();
          this.context.closePath();

    }

	keydown(e){		
		
        switch (e.keyCode) {
            case 32: case 38:              
                 this.action 		  = 'Jump';                    
                 this.Hero.image   = this.images[this.action];
                 this.Hero.width   = 3630;
                 this.Hero.ypos    = -200;  
                 this.snd.src 	  = "assets/sounds/jump2.mp3";
                 this.snd.play();
                break;
            case 39:
                 this.initx += 10;   
                 this.action 		  = 'Run';                    
                 this.Hero.image   = this.images[this.action];
                 this.Hero.width   = 3630;
                break;
            case 40:
                  this.action      = 'Slide';
                  this.Hero.image  = this.images[this.action];
                  this.Hero.ypos   = -150;
                  this.Hero.width  = 3730;
                  this.Hero.ypos   = -400;
                break;
            case 70:       
                  this.action 	  = 'Attack';
                  this.Hero.image  = this.images[this.action];
                  this.Hero.width  = 5360;
                  this.snd.src     = "assets/sounds/blade.mp3";
					   this.snd.play();
                break;
            case 71:         
                  this.action 		= 'Throw';
                  this.Hero.image   = this.images[this.action];
                  this.Hero.width   = 3770;
                  this.snd.src = "assets/sounds/blade.mp3";
					   this.snd.play();
                break;
            default:
                console.log(e.keyCode);
            break;
        }
	}

	keyup(e){
		this.canvas.width = this.canvas.width;
		this.action 	   = 'Idle';
		this.Hero.image   = this.images[this.action];
		this.Hero.ypos    = 300;
		this.Hero.xpos    = 350;		
      this.Hero.width   = 2320;
	}

	/*
	---------------------------------------------------- */
	resize() {

	   this.canvas.width     = window.innerWidth;
	   this.canvas.height    = window.innerHeight;
	   this.initx       		 = 50;
	   this.inity            = this.canvas.height - 600 ;
	   this.loadSprites();
	}

	/*
	---------------------------------------------------- */
	loadSprites (){
		var that = this;
		var imgs = [
		this.loadImage('Attack'),
		this.loadImage('Idle'),
		this.loadImage('Run'),
		this.loadImage('Throw'),
		this.loadImage('Jump'),
		this.loadImage('Slide'),
		this.loadImage('Kunai-launch'),
		this.loadImage('Wizard')
		];
		for( let action of this.actions ){
			let i = 0;
			imgs.push( this.loadImage(action) );
			// while( i < 10 ){
			// 	 imgs.push( this.loadImage(action+'__00'+i) );
			// 	i++;
			// }
		}
		Promise.all(imgs).then(function(a) {			
			that.Hero = new Sprite({
				image:that.images['Idle'],
				context:that.context,
				ypos:300,
				xpos:400,
				width:2320,
				height:that.canvas.height 
			});

			that.Enemy = new Sprite({
				image:that.images['Wizard'],
				context:that.context,
				ypos:300,
				xpos:700,
				width:1632,
				height:that.canvas.height, 
				nof:4				
			});

			
			that.start();
		}, function(e) {		  	
		  	console.log('alguna falló');
		});
	}

	/*
	---------------------------------------------------- */
	loadImage(name){
		var that = this;
		return new Promise((resolve,reject) => {
			let sprite = new Image();
			let path   = 'assets/images/' + name + '.png';						
	      sprite.src = path;
	      sprite.onload  = function(){
				resolve(name);
				that.images[name] = this;
			}
	   	sprite.onerror = function(){
	   		resolve(name);
	   	}
   	});
	}

	/*
	---------------------------------------------------- */
	start (){		
		
	}

}


new Game();


 //    /* 
 //        Updated answer in response to Honey Badger at "http://stackoverflow.com/a/16926273/2252829"
 //        Using requestAnimationFrame instead of setInterval:
 //        The most noted differences are the addition of requestAnimationFrame polyfill and the call of requestAnimationFrame at gameLoop function.
 //        The differences between codes will be recognized by "<--" flag in comments
 //    */

 //    // requestAnimationFrame polyfill
 //    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 //    (function(){	
	// 	var lastTime = 0;
	// 	var currTime, timeToCall, id;
	// 	var vendors = ['ms', 'moz', 'webkit', 'o'];		
	// 	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	// 		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	// 		window.cancelAnimationFrame = 
	// 		  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	// 	}	 
	// 	if (!window.requestAnimationFrame)
	// 	{
	// 		window.requestAnimationFrame = function(callback, element) {
	// 			currTime = Date.now();
	// 			timeToCall = Math.max(0, 16 - (currTime - lastTime));
	// 			id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	// 			  timeToCall);
	// 			lastTime = currTime + timeToCall;
	// 			return id;
	// 		};
	// 	}	 
	// 	if (!window.cancelAnimationFrame)
	// 	{
	// 		window.cancelAnimationFrame = function(id) {
	// 			clearTimeout(id);
	// 		};
	// 	}	
	// })(); // <-- added

 //    // wrapper for our game "classes", "methods" and "objects"
	// window.Game = {};
	
	// // wrapper for "class" Rectangle
	// (function(){
	// 	function Rectangle(left, top, width, height){
	// 		this.left = left || 0;
	// 		this.top = top || 0;
 //            this.width = width || 0;
	// 		this.height = height || 0;
	// 		this.right = this.left + this.width;
	// 		this.bottom = this.top + this.height;
	// 	}
		
	// 	Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
	// 		this.left = left;
 //            this.top = top;
 //            this.width = width || this.width;
 //            this.height = height || this.height
 //            this.right = (this.left + this.width);
 //            this.bottom = (this.top + this.height);
	// 	}
		
	// 	Rectangle.prototype.within = function(r) {
	// 		return (r.left <= this.left && 
	// 				r.right >= this.right &&
	// 				r.top <= this.top && 
	// 				r.bottom >= this.bottom);
	// 	}		
		
	// 	Rectangle.prototype.overlaps = function(r) {
	// 		return (this.left < r.right && 
	// 				r.left < this.right && 
	// 				this.top < r.bottom &&
	// 				r.top < this.bottom);
	// 	}

	// 	// add "class" Rectangle to our Game object
	// 	Game.Rectangle = Rectangle;
	// })();	

	// // wrapper for "class" Camera (avoid global objects)
	// (function(){
	
	// 	// possibles axis to move the camera
	// 	var AXIS = {
	// 		NONE: "none", 
	// 		HORIZONTAL: "horizontal", 
	// 		VERTICAL: "vertical", 
	// 		BOTH: "both"
	// 	};

	// 	// Camera constructor
	// 	function Camera(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight)
	// 	{
	// 		// position of camera (left-top coordinate)
	// 		this.xView = xView || 0;
	// 		this.yView = yView || 0;
			
	// 		// distance from followed object to border before camera starts move
	// 		this.xDeadZone = 0; // min distance to horizontal borders
	// 		this.yDeadZone = 0; // min distance to vertical borders
			
	// 		// viewport dimensions
	// 		this.wView = canvasWidth;
	// 		this.hView = canvasHeight;			
			
	// 		// allow camera to move in vertical and horizontal axis
	// 		this.axis = AXIS.BOTH;	
		
	// 		// object that should be followed
	// 		this.followed = null;
			
	// 		// rectangle that represents the viewport
	// 		this.viewportRect = new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);				
								
	// 		// rectangle that represents the world's boundary (room's boundary)
	// 		this.worldRect = new Game.Rectangle(0, 0, worldWidth, worldHeight);			
	// 	}

	// 	// gameObject needs to have "x" and "y" properties (as world(or room) position)
	// 	Camera.prototype.follow = function(gameObject, xDeadZone, yDeadZone){
	// 		this.followed = gameObject;	
	// 		this.xDeadZone = xDeadZone;
	// 		this.yDeadZone = yDeadZone;
	// 	}					
		
	// 	Camera.prototype.update = function()
	// 	{
	// 		// keep following the player (or other desired object)
	// 		if(this.followed != null)
	// 		{		
	// 			if(this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH)
	// 			{		
	// 				// moves camera on horizontal axis based on followed object position
	// 				if(this.followed.x - this.xView  + this.xDeadZone > this.wView)
	// 					this.xView = this.followed.x - (this.wView - this.xDeadZone);
	// 				else if(this.followed.x  - this.xDeadZone < this.xView)
	// 					this.xView = this.followed.x  - this.xDeadZone;
					
	// 			}
	// 			if(this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH)
	// 			{
	// 				// moves camera on vertical axis based on followed object position
	// 				if(this.followed.y - this.yView + this.yDeadZone > this.hView)
	// 					this.yView = this.followed.y - (this.hView - this.yDeadZone);
	// 				else if(this.followed.y - this.yDeadZone < this.yView)
	// 					this.yView = this.followed.y - this.yDeadZone;
	// 			}						
				
	// 		}		
			
	// 		// update viewportRect
	// 		this.viewportRect.set(this.xView, this.yView);
			
	// 		// don't let camera leaves the world's boundary
	// 		if(!this.viewportRect.within(this.worldRect))
	// 		{
	// 			if(this.viewportRect.left < this.worldRect.left)
	// 				this.xView = this.worldRect.left;
	// 			if(this.viewportRect.top < this.worldRect.top)					
	// 				this.yView = this.worldRect.top;
	// 			if(this.viewportRect.right > this.worldRect.right)
	// 				this.xView = this.worldRect.right - this.wView;
	// 			if(this.viewportRect.bottom > this.worldRect.bottom)					
	// 				this.yView = this.worldRect.bottom - this.hView;
	// 		}
			
	// 	}	
		
	// 	// add "class" Camera to our Game object
	// 	Game.Camera = Camera;
		
	// })();

	// // wrapper for "class" Player
	// (function(){
	// 	function Player(x, y){
	// 		// (x, y) = center of object
	// 		// ATTENTION:
	// 		// it represents the player position on the world(room), not the canvas position
	// 		this.x = x;
	// 		this.y = y;				
			
	// 		// move speed in pixels per second
	// 		this.speed = 200;		
			
	// 		// render properties
	// 		this.width = 50;
	// 		this.height = 50;
	// 	}
		
	// 	Player.prototype.update = function(step, worldWidth, worldHeight){
	// 		// parameter step is the time between frames ( in seconds )
			
	// 		// check controls and move the player accordingly
	// 		if(Game.controls.left)
	// 			this.x -= this.speed * step;
	// 		if(Game.controls.up)
	// 			this.y -= this.speed * step;
	// 		if(Game.controls.right)
	// 			this.x += this.speed * step;
	// 		if(Game.controls.down)
	// 			this.y += this.speed * step;		
			
	// 		// don't let player leaves the world's boundary
	// 		if(this.x - this.width/2 < 0){
	// 			this.x = this.width/2;
	// 		}
	// 		if(this.y - this.height/2 < 0){
	// 			this.y = this.height/2;
	// 		}
	// 		if(this.x + this.width/2 > worldWidth){
	// 			this.x = worldWidth - this.width/2;
	// 		}
	// 		if(this.y + this.height/2 > worldHeight){
	// 			this.y = worldHeight - this.height/2;
	// 		}
	// 	}
		
	// 	Player.prototype.draw = function(context, xView, yView){		
	// 		// draw a simple rectangle shape as our player model
	// 		context.save();		
	// 		context.fillStyle = "black";
	// 		// before draw we need to convert player world's position to canvas position			
	// 		context.fillRect((this.x-this.width/2) - xView, (this.y-this.height/2) - yView, this.width, this.height);
	// 		context.restore();			
	// 	}
		
	// 	// add "class" Player to our Game object
	// 	Game.Player = Player;
		
	// })();

	// // wrapper for "class" Map
	// (function(){
	// 	function Map(width, height){
	// 		// map dimensions
	// 		this.width = width;
	// 		this.height = height;
			
	// 		// map texture
	// 		this.image = null;
	// 	}
		
	// 	// generate an example of a large map
	// 	Map.prototype.generate = function(){
	// 		var ctx = document.createElement("canvas").getContext("2d");		
	// 		ctx.canvas.width = this.width;
	// 		ctx.canvas.height = this.height;		
			
	// 		var rows = ~~(this.width/44) + 1;
	// 		var columns = ~~(this.height/44) + 1;
			
	// 		var color = "red";				
	// 		ctx.save();			
	// 		ctx.fillStyle = "red";		    
	// 		for (var x = 0, i = 0; i < rows; x+=44, i++) {
	// 			ctx.beginPath();			
	// 			for (var y = 0, j=0; j < columns; y+=44, j++) {            
	// 				ctx.rect (x, y, 40, 40);				
	// 			}
	// 			color = (color == "red" ? "blue" : "red");
	// 			ctx.fillStyle = color;
	// 			ctx.fill();
	// 			ctx.closePath();			
	// 		}		
	// 		ctx.restore();	
			
	// 		// store the generate map as this image texture
	// 		this.image = new Image();
	// 		this.image.src = ctx.canvas.toDataURL("image/png");					
			
	// 		// clear context
	// 		ctx = null;
	// 	}
		
	// 	// draw the map adjusted to camera
	// 	Map.prototype.draw = function(context, xView, yView){					
	// 		// easiest way: draw the entire map changing only the destination coordinate in canvas
	// 		// canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
	// 		//context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);
			
	// 		// didactic way:
			
	// 		var sx, sy, dx, dy;
 //            var sWidth, sHeight, dWidth, dHeight;
			
	// 		// offset point to crop the image
	// 		sx = xView;
	// 		sy = yView;
			
	// 		// dimensions of cropped image			
	// 		sWidth =  context.canvas.width;
	// 		sHeight = context.canvas.height;

	// 		// if cropped image is smaller than canvas we need to change the source dimensions
	// 		if(this.image.width - sx < sWidth){
	// 			sWidth = this.image.width - sx;
	// 		}
	// 		if(this.image.height - sy < sHeight){
	// 			sHeight = this.image.height - sy; 
	// 		}
			
	// 		// location on canvas to draw the croped image
	// 		dx = 0;
	// 		dy = 0;
	// 		// match destination with source to not scale the image
	// 		dWidth = sWidth;
	// 		dHeight = sHeight;									
			
	// 		context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);			
	// 	}
		
	// 	// add "class" Map to our Game object
	// 	Game.Map = Map;
		
	// })();

	// // Game Script
	// (function(){
	// 	// prepaire our game canvas
	// 	var canvas = document.getElementById("canvas");
	// 	var context = canvas.getContext("2d");

 //        // game settings: // <-- some game settings were removed because requestAnimationFrame controls the screen automatically
	// 	//var FPS = 30; <--removed
	// 	//var INTERVAL = 1000/FPS; // milliseconds <--removed
 //        var last = 0; // last frame timestamp
 //        var now = 0; // current timestamp
 //        var step = now-last; // time between frames
		
	// 	// setup an object that represents the room
	// 	var room = {
	// 		width: 5000,
	// 		height: 3000,
	// 		map: new Game.Map(5000, 3000)
	// 	};
		
	// 	// generate a large image texture for the room
	// 	room.map.generate();
		 
	// 	// setup player
	// 	var player = new Game.Player(50, 50);
		
	// 	// setup the magic camera !!!
	// 	var camera = new Game.Camera(0, 0, canvas.width, canvas.height, room.width, room.height);		
	// 	camera.follow(player, canvas.width/2, canvas.height/2);
		
	// 	// Game update function
	// 	var update = function(step){ 
	// 		player.update(step, room.width, room.height); // <-- edited
	// 		camera.update();
	// 	}
			
	// 	// Game draw function
	// 	var draw = function(){
	// 		// clear the entire canvas
	// 		context.clearRect(0, 0, canvas.width, canvas.height);
			
	// 		// redraw all objects
	// 		room.map.draw(context, camera.xView, camera.yView);		
	// 		player.draw(context, camera.xView, camera.yView);		
	// 	}
        
 //        var runningId = -1;
		
	// 	// Game Loop
	// 	var gameLoop = function(timestamp){ // <-- edited; timestamp comes from requestAnimationFrame. See polyfill to get this insight.
 //            now = timestamp; // <-- current timestamp (in milliseconds)
 //            step = (now-last)/1000; // <-- time between frames (in seconds)
 //            last = now; // <-- store the current timestamp for further evaluation in next frame/step 
            
	// 		update(step);
	// 		draw();
 //            runningId = requestAnimationFrame(gameLoop); // <-- added
	// 	}	
		
 //        // ---configure play/pause capabilities:
		
	// 	Game.play = function(){	
	// 		if(runningId == -1){
	// 			runningId = requestAnimationFrame(gameLoop); // <-- changed
	// 			console.log("play");
	// 		}
	// 	}
		
	// 	Game.togglePause = function(){		
	// 		if(runningId == -1){
	// 			Game.play();
	// 		}
	// 		else
	// 		{
	// 			cancelAnimationFrame(runningId);// <-- changed
	// 			runningId = -1;
	// 			console.log("paused");
	// 		}
	// 	}	
		
	// 	// ---
		
	// })();

	// // <-- configure Game controls:

	// Game.controls = {
	// 	left: false,
	// 	up: false,
	// 	right: false,
	// 	down: false,
	// };

	// window.addEventListener("keydown", function(e){
	// 	switch(e.keyCode)
	// 	{
	// 		case 37: // left arrow
	// 			Game.controls.left = true;
	// 			break;
	// 		case 38: // up arrow
	// 			Game.controls.up = true;
	// 			break;
	// 		case 39: // right arrow
	// 			Game.controls.right = true;
	// 			break;
	// 		case 40: // down arrow
	// 			Game.controls.down = true;
	// 			break;
	// 	}
	// }, false);

	// window.addEventListener("keyup", function(e){
	// 	switch(e.keyCode)
	// 	{
	// 		case 37: // left arrow
	// 			Game.controls.left = false;
	// 			break;
	// 		case 38: // up arrow
	// 			Game.controls.up = false;
	// 			break;
	// 		case 39: // right arrow
	// 			Game.controls.right = false;
	// 			break;
	// 		case 40: // down arrow
	// 			Game.controls.down = false;
	// 			break;
	// 		case 80: // key P pauses the game
	// 			Game.togglePause();
	// 			break;		
	// 	}
	// }, false);

	// // -->

	// // start the game when page is loaded
	// window.onload = function(){	
	// 	Game.play();
	// }