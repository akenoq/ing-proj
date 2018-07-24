"use strict";

window.addEventListener("load", function () {
const ww = 800;
const hh = 600;

let scene = new THREE.Scene ();
let camera = new THREE.PerspectiveCamera (45, ww/hh, 0.1, 1000);
let renderer = new THREE.WebGLRenderer ();	

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


renderer.render (scene, camera);
	
});
