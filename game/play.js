"use strict";

window.onload = function () {

	let scoreLabel = document.getElementById ("scoreLabel");
	let  pauseBtn = document.getElementById ("pauseBtn");
	let  startBtn = document.getElementById ("startBtn");
	let holst = document.getElementById ("holst");
	let ris = holst.getContext ('2d');
	
	let score = 0;
	let a = 1;
	function res () {
		score+=a;
		a++;
		ch.x = 250;
		ch.y = 30 ;
		ch.line = -1;
		ch.vec =0;
		road = [];
		for (let i = 0; i<5; i++){
			let mash=[];
			mash[0] = new viec (i,40,a);
			road[i]=mash;
		}
		scoreLabel.innerHTML = "Счет: "+ score;
	}
	
	function GameEnd (){
		if ((ch.end === false)&&(ch.line > -1)) {
			end = false;
		}
	}
	
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
	
	class chel {
	
		constructor (x =250, line = -1) {
				this.x = x;
				this.y = 70 + line*40;
				this.line = line;
				this.end = true;
				this.vec = 0;
		}
		
		draw () {
			this.x = this.x + this.vec - 2*this.vec* (this.line%2);
			if ((this.x<0)||(this.x>550)){
				this.end = false;
			}
			ris.beginPath ();
			ris.arc (this.x, this.y, 5, 0, 2*Math.PI, true);
			ris.closePath ();
			ris.fillStyle = '#FF0000';
			ris.fill ();
		}
		
		remove (){
			this.y = 70 + this.line*40;
			let t = road[this.line].length;
			let i = 0;
			let p =true;
			while ((i<t)&&(p === true)){
				if ((road[this.line][i].x<this.x)&&((road[this.line][i].x+road[this.line][i].size )>this.x)){
					p =false; 
					this.vec=a;
				}
				else {
					this.vec = 0;
				}
				i++;
			}
			this.end = !p;
		}
	
	}
	
	let road = [];
	for (let i=0; i<5; i++){
		let mash = [];
		mash[0]= new viec (i, 40, 1);
		road[i]=mash;
	}
	let ch = new chel ();
	let end = true;
	let pause = true;
	
	window.onkeydown = function (event) {
		let keyNumber = event.keyCode;
		if ((keyNumber === 87)&&(ch.line < 5)){
			if (ch.line === 4 ){
				res();
			}
			else {
				ch.line++;
			}
		}
		if ((keyNumber === 83)&&(ch.line > 0)) {
			ch.line--;
		}
		ch.remove ();
	}
	
	pauseBtn.onclick = function () {
		pause = !pause;
		if (pause === false) {
			holst.style.opacity = 0.5;
		}
		if (pause === true) {
			holst.style.opacity = 1.0;
		}
		
	}
	
	startBtn.onclick = function () {
		a=0;
		res ();
		score = 0;
		scoreLabel.innerHTML = "Счет: " + score;
		end=true;
	}
	
	
	function  redraw (){
		GameEnd();
		if ((pause)&&(end)){
			ris.clearRect (0,0, 800, 800);
			for (let i=0; i<5; i++){
				let t = road[i].length;
				if ((i%2) === 0){
						if (road[i][t-1].x>=50){
							let size = 100;
							road[i][t]= new viec (i, size, a);
						}
					}
					else {
						if ((road[i][t-1].x+road[i][t-1].size)<=550){
							let size = 100;
							road[i][t]= new viec (i, size, a);
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
			ch.draw ();
		}
	}
	
	let timer = setInterval (redraw, 50);

	
}
