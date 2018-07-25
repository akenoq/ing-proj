"use strict";

window.addEventListener("load", function () {
const ww = 800;
const hh = 600;

let scene = new THREE.Scene ();
let camera = new THREE.PerspectiveCamera (45, ww/hh, 0.1, 1000);
let renderer = new THREE.WebGLRenderer ();	

function createCube (hh=20, xx=0, zz=0, d=true){
		//let cubeColor = getRandomColor();
		//if (d){
			let cubeColor = "#9b42f4";
		//}
		let cubeGeometry = new THREE.CubeGeometry  (hh,hh,hh);
		let cubeMaterial = new THREE.MeshLambertMaterial({color: cubeColor});
		let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		//cube.castShadow = true;
		cube.position.x = xx;
		cube.position.y = hh/2;
		cube.position.z = zz;
		scene.add (cube);
		
		obj.push (cube);
	}
	
	let pointLightA;
	function EnableLight (){
		pointLightA = new THREE.PointLight( "#FFFFFF", 2);
		
		pointLightA.position.set( -20, 200, -20 );
		
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
	camera.position.x = 200 ;
	camera.position.y =200;
	camera.position.z =200;
	camera.rotation.x = - Math.PI/4;
	camera.rotation.y =Math.PI/4;
	camera.rotation.z =0;
	EnableLight ();
	let planeGeometry = new THREE.PlaneGeometry (350, 400,1 , 10);
	let planeMaterial = new THREE.MeshBasicMaterial ({color: 0x00ff00});
	plane =new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI/2;
	plane.position.x = 0;
	plane.position.y= 0;
	plane.position.z= 0;
	scene.add (plane);
}
	
start();

let gridHelper = new THREE.GridHelper (100, 10, "#ff0000","#ff0000");
scene.add (gridHelper);

let axes = new THREE.AxisHelper(200);
scene.add(axes);

createCube ();
renderer.render (scene, camera);
	
});
