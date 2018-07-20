"use strict";

window.onload = function () {
	
	let result = document.getElementById ("result");
	for  (var i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		result.innerHTML+= "<tr><td>"+localStorage[key]+"</td></tr>"
	}
	
	
	
}