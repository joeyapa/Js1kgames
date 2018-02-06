/*
 *  Theme: The Volatile Coin Mine
 *  
 *
 *  A basic buy and sell game. Buy coins using cash and sell them, 
 *  you gradually lose cash over time. Display a graph with coin price over time.
 *  
 *  Increase coin volatility over time.
 *
 *  Compress via https://siorki.github.io/regPack.html
 *  Compress via https://closure-compiler.appspot.com/home
 */ 

setTimeout(function(){
//var a = document.getElementById('canvas');
//var b = document.body;
//var c = a.getContext('2d');

var a = window.a;
var b = window.b;
var c = window.c;

var framecount = 0; // delta count for every animation frame
var component = []; // sprite component container

var coins = 0; // game coins bought
var cash = 20.0000; // cash in hand
var coinforex = 120.0000; // initial forex exchange rate

/**
 * r - Sprite function
 * @constructor
 */
function r(){ return this; }

/**
 * r.u - Sprite.Update function
 *
 */
r.prototype.u = function(){ 
	var s = this;
	k(s.c);
	q(s.x,s.y,s.w,s.h); 
}

/**
 * d - Draw function
 *
 */
function k(k) {	
	c.strokeStyle=k?'#0f0':'#f00';	
}	


/**
 * d - Draw function
 *
 */
function d() {	
	c.clearRect(0,0,a.width,a.height);
	k(0);
	c.fillStyle ='#aaa';
	c.font = "10px Consolas";

	// create the graph
	q(100,420,520,1); 
	q(210,460,100,40); 	
	q(420,460,100,40); 
	
	// create graph the text values
	for(var i=420;i>=0;i-=50) c.fillText(420-i,80,i+5);	
	

	// button - buy coins
	c.fillText('BUY', 250, 480);	

	// button - sell coins	
	c.fillText('SELL-ALL', 450, 480);		

	// hud - current coin
	c.fillText('TIME:'+framecount+', COINS:'+coins+', CASH:$'+cash.toFixed(4)+', FX $1:'+coinforex, 250, 440);		

	// animate the components
	for(var i=0;i<component.length;i++) {
		component[i].x-=1;
		component[i].u();
		if( component[i].x < 100 ) component.splice(i,1);
	} 	

	// price fluctuation	
	if(framecount%10==0) {		
		var fx = z(-20,35+framecount/100);
		coinforex = Math.min(Math.max(20,coinforex+fx),390);	// generate forex 

		var spriteblock = new r();
		spriteblock.c=fx<0?0:1; 
		spriteblock.x=620; 
		spriteblock.y=420-coinforex;
		spriteblock.w=3; 
		spriteblock.h=z(2,20);	
		component.push(spriteblock);

		var spriteline = new r();
		spriteline.c=spriteblock.c; 
		spriteline.x=spriteblock.x+1;
		spriteline.w=spriteblock.w-2;	
		spriteline.h=z(spriteblock.h,spriteblock.h*4);
		spriteline.y=z(spriteblock.y,spriteblock.h-spriteline.h);
		component.push(spriteline);

		
		cash-=0.1; // reduce cash over time

		coinforex = coinforex>380?250:coinforex;

		if( cash<0 ) return; // gameover, exit 

	}
	
	framecount++;

	window.requestAnimationFrame(d);
}

/**
 * q - create rectangle in canvas
 */
function q(x,y,w,h){  
	c.beginPath()
	c.rect(x,y,w,h); 
	c.stroke(); 
}

/**
 * z - random integer	
 * @param n - minimum
 * @param m - maximum is n+m
 */
function z(n,m) {
	return Math.floor((Math.random()*m)+1)+n;
}

/**
 * Control, mouse or touch
 *
 */
b.onmousedown=function(e){
	if(e.x<350) {		
       cash--;
       coins+=coinforex;
	}
	else {		
		cash+=coins/coinforex;	
		coins=0;		
	}
}

/*
 * Call draw canvas
 *
 */
d();

},1000);
