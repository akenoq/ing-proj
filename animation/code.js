"use strict";

window.onload = function () {
	
	let holst = document.getElementById ("holst");
	let ris = holst.getContext ('2d');
	
	let size = 1;
	let p = true;
	let x=200;
	let y=200;
	
	function redraw () {
	ris.fillStyle = '#FFFFFF';
	ris.fillRect (0,0,400, 600);
	ris.strokeStyle = '#00FF00';
	ris.beginPath ();
	ris.arc (200,200, 50, 0, 2*Math.PI, false);
	ris.moveTo (x+50,y);
	ris.closePath ();
	ris.strokeStyle = '#000000';
	ris.arc (x,y, 50, 0, 2*Math.PI, false);
	ris.stroke ();
	
	if (((x+50)>400 ) || ((x-50)<0)){
		if (p === true) {
			p = false;
		} else {
			p = true;
		}
	}
	if (p === true){
		x=x+1;
	} 
	else {
		x=x-1;
	}	
	}
	let timer = setInterval (redraw, 50);
};