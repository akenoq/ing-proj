"use strict";

window.onload = function() {
	let f1 = document.getElementById("f1");
	let f2 = document.getElementById("f2");
	let btn = document.getElementById("btn");
	
	btn.onclick = function() {
		let x1 = f1.value;
		let x2 = f2.value;
		
		let n1 = parseInt(x1);
		let n2 = parseInt(x2);
		
		let s = n1 + n2;
		alert(s);
	}
	
	let label = document.getElementById("label");
	label.innerHTML = 0;
	
	let seconds = 0;
	
	let inter = setInterval(function() {
		seconds = seconds + 1;
		label.innerHTML = seconds;
	}, 1000);
	
}


















