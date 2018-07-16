"use strict";

window.onload = function() {
	let inputA = document.getElementById("inputA");
	let inputB = document.getElementById("inputB");
	
	let btn = document.getElementById("btn");
	
	btn.onclick = function() {
		// берем значения из input
		let a = inputA.value;
		let b = inputB.value;
		
		// переводим в целое число
		a = parseInt(a);
		b = parseInt(b);
		
		let sum = a + b;
		alert("Сумма = " + sum);
	}
	
	
	
	
	let res = document.getElementById("result");
	let sec = 0;
	
	let myInter = setInterval(function(){
			res.innerHTML = sec;
			sec = sec + 1;
		}, 1000);
	
}







