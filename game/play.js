"use strict";

window.onload = function () {

	let scoreLabel = document.getElementById ("scoreLabel");
	let  pauseBtn = document.getElementById ("pauseBtn");
	let holst = document.getElementById ("holst");
	let ris = holst.getContext ('2d');
	
	class viec {
		
		constructor (line = 1, size = 40, vec = 1){
				if (line%2 === 0) {
						this.x=-size;
						this.vec=vec;
				}
				else {
					this.x=600;
					this.vec=-vec;	
				}
				this.y=100 + (line-1)*40;
				this.line = line;
				this.size = size;
		}
		
		draw () {
			ris.fillStyle = '#000000';
			ris.fillRect (this.x, this.y , this.size, 20);
			this.x+=this.vec;
		}
		
		del() {
			if (this.line%2 === 0){
				if (this.x>550){
					return true;
				}
				else {
					return false;
				}
			}
			else {
				if (this.x<(0-this.size)){
					return true;
				}
					else {
						return false;
					}
			}
		}
		
	}
	
	let road = [];
	for (let i=0; i<5; i++){
		let mash = [];
		mash[0]= new viec (i, 40, 1);
		road[i]=mash;
	}
	
	
	
	function  redraw (){
		ris.clearRect (0,0, 800, 800);
		
		for (let i=0; i<5; i++){
			let t = road[i].length;
			if ((i%2) === 0){
					if (road[i][t-1].x>=50){
						let size = 100;
						road[i][t]= new viec (i, size, 1);
					}
				}
				else {
					if ((road[i][t-1].x+road[i][t-1].size)<=550){
						let size = 100;
						road[i][t]= new viec (i, size, 1);
					}
				}
			for (let j=0; j<t; j++){
				if (road[i][j].del ()){
					road[i].shift ();
					j--;
					t--;
				} 
				else {	
					road[i][j].draw ();
				}				
			}
		}
	}
	
	let timer = setInterval (redraw, 50);

	
}
