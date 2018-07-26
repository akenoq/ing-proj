"use strict";

window.addEventListener("load", function () {
const ww = 800;
const hh = 600;

let scene = new THREE.Scene ();
let camera = new THREE.PerspectiveCamera (45, ww/hh, 0.1, 1000);
let renderer = new THREE.WebGLRenderer ();	

	function getRandomNumber (min,max){
		return parseInt(Math.random()*(max-min)+min);
	}

	
	function getRandomColor(){
		const arr = ["#c95014","#204906","#026d52","#0b2054","#b50534"];
		const number = parseInt(Math.random() * 10000) % 5;
		return arr[number];
	}
	
	let EnemyOnMap =30;
	let ViewDistance =400;
	function Population () {
		let t = obj.length;
		let PlayerPos = obj[0].position;
		for (let i = 1; i<t; i++){
			let CubePos = obj[i].position;
			let dx = Math.abs(PlayerPos.x-CubePos.x);
			let dz = Math.abs(PlayerPos.z-CubePos.z);
			if (dx>ViewDistance || dz>ViewDistance){
				scene.remove (obj[i]);
				obj.splice (i, 1);
				objProperties.splice (i,1);
				t--;
				i--;
			}
		}
		
		for (let i = 0; i< (EnemyOnMap-t+1); i++) {
			let xx = getRandomNumber (PlayerPos.x-300, PlayerPos.x+300);
			let zz = getRandomNumber (PlayerPos.z-300, PlayerPos.z+300);
			createCube (6, xx, zz, false);
		}
	}
	
function createCube (hh=20, xx=0, zz=0, d=true){
		let n = parseInt(Math.random()*100)%5;
		let  cubeColor = "#FF0000";
		let sc;
		sc=0;
		let sp = false;
		let mag = false;
		if (n === 1) {cubeColor = "#c95014"; sc = 1;}
		if (n === 2) {cubeColor = "#000000"; sc = -1;}
		if (n === 3) {cubeColor = "#cbf442";sp = true;}
		if (n === 4) {cubeColor = "#4147f4";mag = true;}
		let bon = {
			score: sc,
			magnet: mag,
			speed: sp
		}
		if (d === true){
			cubeColor = "#9b42f4";
		}
		let cubeGeometry = new THREE.CubeGeometry  (hh,hh,hh);
		let cubeMaterial = new THREE.MeshLambertMaterial({color: cubeColor});
		let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.castShadow = true;
		cube.position.x = xx;
		cube.position.y = hh/2;
		cube.position.z = zz;
		scene.add (cube);
		if (d === false){
		objProperties.push(bon);}
		obj.push (cube);
	}
	
	let a = false;
    let d = false;
	let w = false;
	let s = false;
	window.onkeydown = function (event) {
        let keyNumber = event.keyCode;
        if(keyNumber === 65) {
            a = true;
        }
        if(keyNumber === 68) {
            d = true;
        }
		if(keyNumber === 87) {
            w = true;
        }
        if(keyNumber === 83) {
            s = true;
        }
    };
	window.onkeyup = function (event) {
        let keyNumber = event.keyCode;
        if(keyNumber === 65) {
            a = false;
        }
        if(keyNumber === 68) {
            d = false;
        }
		if(keyNumber === 87) {
            w = false;
        }
        if(keyNumber === 83) {
            s = false;
        }
    };
	
	function frameDrawer () {
		renderer.render(scene, camera);
	}
	
	function frameLogic () {
		MovePlayer ();
		cameraFollow ();
		Population();
		Score ();
	}
	
	let timerDrawer;
	let timerLogic;
	let scoreLabel = document.getElementById ("lbl");
	let objProperties = [];
	
	function cameraFollow () {
		let dX=obj[0].position.x-camera.position.x;
		let dZ=obj[0].position.z-camera.position.z;
		let dc = Math.sqrt (dX*dX+dZ*dZ);
		if (dc>70) {
			camera.position.x+=parseInt (dX*3*PlayerSpeed/(2*dc)) ;
			camera.position.z+=parseInt (dZ*3*PlayerSpeed/(2*dc)) ;
			pointLightA.position.set (camera.position.x-20, 200, camera.position.z-20);
		}
		camera.lookAt (obj[0].position);
		camera.rotation.z = 3*Math.PI/2;
	}
	
	let PlayerSpeed =1;
	let speedBoost;
	let PlayerMagnet = false;
	let magnetBoost;
	let score =100;
		function Score() {
		let t = obj.length;
		let PlayerPos = obj[0].position;
		for (let i = 1; i<t; i++){
			let CubePos = obj[i].position;
			let dx = Math.abs(PlayerPos.x-CubePos.x);
			let dz = Math.abs(PlayerPos.z-CubePos.z);
			if (dx<13 && dz<13){
				scene.remove (obj[i]);
				obj.splice (i, 1);
				t--;
				i--;
				console.log (objProperties[i]);
				score+=objProperties[i].score;
				if (objProperties[i].speed) {
					PlayerSpeed = 5;
					objProperties[i].speed = false;
					speedBoost=setInterval(function (){
						PlayerSpeed=1;
						clearInterval (speedBoost);}, 5000);
				
				
				}
				if (objProperties[i].magnet) {
					PlayerMagnet = true;
					objProperties[i].magnet = false;
					magnetBoost=setInterval(function (){
						PlayerMagnet=false;
						clearInterval (magnetBoost);}, 5000);
				
				
				}
				objProperties.splice(i, 1);
				//scoreLabel.innerHTML = score;
			}
		}
	}
	
	function MovePlayer () {
		if(w) {
            obj[0].position.x+=PlayerSpeed;
			plane.position.x+= PlayerSpeed;
        }
        if(s) {
            obj[0].position.x-=PlayerSpeed;
			plane.position.x-= PlayerSpeed;
        }
		if(a) {
            obj[0].position.z-=PlayerSpeed;
			plane.position.z-= PlayerSpeed;
        }
        if(d) {
            obj[0].position.z+=PlayerSpeed;
			plane.position.z+= PlayerSpeed;
        }
	}
	
	let pointLightA;
	function EnableLight (){
		pointLightA = new THREE.PointLight( "#FFFFFF", 2);
		
		pointLightA.position.set( 20, 200, 20 );
		
		scene.add(pointLightA);
	
		renderer.shadowMap.enabled = true;
		pointLightA.castShadow = true;
	
	}
	
let obj = [];
let plane;
function start () {
	renderer.setClearColor ("#67ddff");
	renderer.setSize (ww,hh);
	document.getElementById("holst").append(renderer.domElement);
	camera.position.x = 0 ;
	camera.position.y =300;
	camera.position.z =0;
	camera.rotation.x = - Math.PI/2;
	camera.rotation.y =0;
	camera.rotation.z =3*Math.PI/2;
	EnableLight ();
	let planeGeometry = new THREE.PlaneGeometry (350, 400,1 , 10);
	let planeMaterial = new THREE.MeshBasicMaterial ({color: 0x00ff00});
	plane =new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI/2;
	plane.position.x = 0;
	plane.position.y= 0;
	plane.position.z= 0;
	scene.add (plane);
	timerDrawer = setInterval (frameDrawer, 20);
	timerLogic = setInterval (frameLogic, 20);
}
	
start();

let gridHelper = new THREE.GridHelper (100, 10, "#ff0000","#ff0000");
scene.add (gridHelper);

let axes = new THREE.AxisHelper(200);
scene.add(axes);

createCube (20, 0, 0 , true);
createCube (6, 10,10 , false);
renderer.render (scene, camera);
	
});
