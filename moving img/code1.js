"use strict";

window.onload = function() {
	let imgBox = document.getElementById("pic");
	
	function movePic() {
		let k = 0;
		let myInter = setInterval(
			function() {
				imgBox.style.left = k + "px";
				k = k + 5;
			}, 50);
	}
	
	movePic();
};
