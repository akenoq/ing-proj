"use strict";

window.onload = function() {
	let playBtn = document.getElementById("playBtn");
	let resultBtn = document.getElementById("resultBtn");
	let aboutBtn = document.getElementById("aboutBtn");
	
	playBtn.onclick	= function() {
		window.location = "play.html";
	}
	
	resultBtn.onclick = function() {
		window.location = "results.html";
	}
	
	aboutBtn.onclick = function() {
		window.location = "about.html";
	}
};
