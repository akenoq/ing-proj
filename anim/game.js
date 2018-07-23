"use strict";

window.onload = function() {
	let can = document.getElementById("can");
	let holst = can.getContext("2d");
	
	function drawFon() {
		holst.clearRect(0, 0, 800, 600);
		holst.fillStyle = "#0000FF";
		holst.fillRect(0, 0, 800, 600);
	}
	
	drawFon();
	
	let botX = 100;
	let botY = 200;
	let botSpeed = 5;
	
	function drawBot() {
		holst.fillStyle = "#00FF00";
		holst.fillRect(botX, botY, 50, 50);
	}
	
	drawBot();
	
	function moveBot() {
		botX = botX + botSpeed;
		
		if(botX + 50 + Math.abs(botSpeed) >= 800) {
			botSpeed = botSpeed * (-1);
		}
		
		if(botX - Math.abs(botSpeed) <= 0) {
			botSpeed = botSpeed * (-1);
		}
	}
	
	let heroX = 300;
	let heroY = 400;
	let heroSpeed = 7;
	
	function drawHero() {
		holst.fillStyle = "#FFFFFF";
		holst.fillRect(heroX, heroY, 50, 50);
	}
	
	let w = false;
	let a = false;
	let s = false;
	let d = false;
	
	window.onkeydown = function(event) {
		let n = event.keyCode;
		console.log(n);
		if(n === 65) a = true;
		if(n === 68) d = true;
		if(n === 87) w = true;
		if(n === 83) s = true;
	}
	
	window.onkeyup = function(event) {
		let n = event.keyCode;
		if(n === 65) a = false;
		if(n === 68) d = false;
		if(n === 87) w = false;
		if(n === 83) s = false;
	}
	
	function moveHero() {
		if(d === true) heroX = heroX + heroSpeed;
		if(a === true) heroX = heroX - heroSpeed;
		if(w === true) heroY = heroY - heroSpeed;
		if(s === true) heroY = heroY + heroSpeed;
	}
	
	function getRandomNumber(n) {
		let x = Math.random();     // 0.33545729373336
		let y = x * 10000;         // 3354.5729373336
		let z = parseInt(y);       // 3354
		let q = z % n;             // остаток от деления
		return q;
	}
	
	function hitTest() {
		let sX = Math.abs(heroX - botX);
		let sY = Math.abs(heroY - botY);
		
		if(sX < 50 && sY < 50) {
			let randX = getRandomNumber(600) + 100;
			let randY = getRandomNumber(400) + 100;
			botX = randX;
			botY = randY;
		}
	}
	
	let arr = [];
	arr[0] = {xx: 400, yy: 100};
	arr[1] = {xx: 460, yy: 420};
	arr[2] = {xx: 500, yy: 170};
	
	function drawEnemies() {
		for(let i = 0; i < arr.length; i++) {
			let xx = arr[i].xx;
			let yy = arr[i].yy;
			holst.fillStyle = "#FF0000";
			holst.fillRect(xx, yy, 50, 50);
		}
	}
	
	let inter = setInterval(function(){
		moveBot();
		moveHero();
		hitTest();
		drawFon();
		drawBot();
		drawHero();
		drawEnemies();
	}, 50);
	
}



















































