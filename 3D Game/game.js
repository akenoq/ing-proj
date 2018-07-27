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
	
	let finishSpot;
	
	function createFinish () {
			let finishGeometry = new THREE.PlaneGeometry (60, 60,1 , 10);
			let finishMaterial = new THREE.MeshLambertMaterial ({color: 0x111111});
			finishSpot =new THREE.Mesh(finishGeometry, finishMaterial);
			let zz = getRandomNumber(0,200);
			let xx = getRandomNumber(0,200);
			finishSpot.rotation.x = -Math.PI/2;
			finishSpot.position.x = xx;
			finishSpot.position.y= 1;
			finishSpot.position.z= zz;
			finishSpot.receiveShadow = true;
			scene.add (finishSpot);
	}
	
	let gameEnd = false;
	let pause = true;
	function Finish () {
		let dx = Math.abs (obj[0].position.x-finishSpot.position.x);
		let dz = Math.abs (obj[0].position.z-finishSpot.position.z);
		if (dx<20 && dz<20) {
			gameEnd = true;
			scoreLabel.innerHTML="Безопасная зона достигнута. Твой счет "+ score;
		}
	}
	
	let pauseBtn = document.getElementById ("pausebtn");
	let startBtn = document.getElementById ("startbtn");
	pauseBtn.innerHTML = "Начать";
	pauseBtn.onclick = function (){
		pause = !pause;
		pauseBtn.innerHTML = "Пауза";
		if (pause){
			scoreLabel.innerHTML="Пауза";
		} else {
			scoreLabel.innerHTML=score;
		}
	}
	startBtn.onclick = function () {
		/*let gameEnd = false;
		let pause = true;
		pauseBtn.innerHTML = "Начать";
		for (let i  =0; i<obj.length; i++){
			scene.remove (obj[i]);
		}
		scene.remove(finishSpot);
		obj=[];
		objProperties=[];
		createCube ();
		start();
		score = 100;*/
		location.reload();
	}
	
	let walls=[];
	function createWall (xx=0, zz= 0, rot = 0) {
		let wallColor = "#cccccc";
		let wallGeometry = new THREE.CubeGeometry  (8,50,100);
		let wallMaterial = new THREE.MeshLambertMaterial({color: wallColor});
		let wall = new THREE.Mesh(wallGeometry, wallMaterial);
		wall.castShadow = true;
		wall.position.x = xx;
		wall.position.y = 25;
		wall.position.z = zz;
		wall.rotation.y = Math.PI/2*(rot);
		wall.receiveShadow = true;
		scene.add (wall);
		walls.push (wall);
	}
	
	function TryTo (xx, zz, size){
		let t = walls.length;
		for (let i = 0; i<t ; i++){
			let rot =parseInt(walls[i].rotation.y/(Math.PI/2));
			let dx = Math.abs(xx-walls[i].position.x);
			let dz = Math.abs(zz-walls[i].position.z);
			if ((dx<=(4*Math.abs(rot-1)+50*rot+size)) && (dz<=(50*Math.abs(rot-1)+4*rot)+size)){
				return false;
			}	
		}
		return true;
	}
	
	let EnemyOnMap =40;
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
				objProperties.splice (i-1,1);
				t--;
				i--;
				console.log (objProperties.length, obj.length, 67);
			}
		}
		for (let i = 0; i< (EnemyOnMap-t+1); i++) {
			let xx = getRandomNumber (PlayerPos.x-300, PlayerPos.x+300);
			let zz = getRandomNumber (PlayerPos.z-300, PlayerPos.z+300);
			createCube (6, xx, zz, false);
			console.log (objProperties.length, obj.length, 75);
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
		if (TryTo(xx, zz, 3)){
			scene.add (cube);
			if (d === false){
				objProperties.push(bon);
			}
			obj.push (cube);
		}
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
		if (gameEnd===false && pause===false){
			for (let i=0; i<PlayerSpeed; i++){
				MovePlayer ();
			}
			cameraFollow ();
			Population();
			Score ();
			Finish();
		}
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
	
	let PlayerSpeed =2;
	let speedBoost;
	let PlayerMagnet = false;
	let magnetBoost;
	let score =100;
	function Score() {
		let t = objProperties.length;
		let PlayerPos = obj[0].position;
		for (let i = 0; i<t; i++){
			let CubePos = obj[i+1].position;
			let dx = Math.abs(PlayerPos.x-CubePos.x);
			let dz = Math.abs(PlayerPos.z-CubePos.z);
			if (dx<13 && dz<13){
				score+=objProperties[i].score;
				if (objProperties[i].speed) {
					PlayerSpeed = 5;
					objProperties[i].speed = false;
					clearInterval (speedBoost);
					speedBoost=setInterval(function (){
							PlayerSpeed=3;
							clearInterval (speedBoost);
						}, 5000);
				} else{
					if (objProperties[i].magnet) {
						PlayerMagnet = true;
						objProperties[i].magnet = false;
						clearInterval (magnetBoost);
						magnetBoost=setInterval(function (){
							PlayerMagnet=false;
							clearInterval (magnetBoost);}, 5000);
					}
				}
				console.log (objProperties[i]);
				objProperties.splice(i, 1);
				scene.remove (obj[i+1]);
				obj.splice (i+1, 1);
				t--;
				i--;
				scoreLabel.innerHTML = score;
			}
		}
	}
	
	function MovePlayer () {
		let tryposX = obj[0].position.x;
		let tryposZ = obj[0].position.z;
		let p = tryposX;
		if(w) {
            tryposX+=1;
        }
        if(s) {
            tryposX-=1;
        }
		if	(TryTo (tryposX, tryposZ, 10)) {
			obj[0].position.x=tryposX;
			plane.position.x=tryposX;
		}
		tryposX=p;
		if(a) {
			tryposZ-=1;
        }
        if(d) {
			tryposZ+= 1;
        }
		if	(TryTo (tryposX, tryposZ, 10)) {
			obj[0].position.z=tryposZ;
			plane.position.z=tryposZ;
		}
		if (PlayerMagnet){
			let t = objProperties.length;
			let PlayerPos = obj[0].position;
			for (let i = 0; i<t; i++){
				if (objProperties[i].magnet === false && objProperties[i].speed===false){
					let CubePos = obj[i+1].position;
					let dx = PlayerPos.x-CubePos.x;
					let dz = PlayerPos.z-CubePos.z;
					let dc = Math.sqrt (dx*dx+dz*dz);
					let tx = CubePos.x;
					let tz = CubePos.z;
					tx += parseInt (dx*3/dc);
					if (TryTo (tx,tz, 3)){
						CubePos.x = tx;
					}
					tx -= parseInt (dx*3/dc);
					tz += parseInt (dz*3/dc);
					if (TryTo (tx,tz, 3)){
						CubePos.z = tz;
					}
				}
			}
		}
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
		camera.position.x = 600 ;
		camera.position.y =300;
		camera.position.z =600;
		camera.rotation.x = - Math.PI/2;
		camera.rotation.y =0;
		camera.rotation.z =3*Math.PI/2;
		EnableLight ();
		let planeGeometry = new THREE.PlaneGeometry (550, 600,1 , 10);
		let planeMaterial = new THREE.MeshLambertMaterial ({color: 0x00ff00});
		plane =new THREE.Mesh(planeGeometry, planeMaterial);
		plane.rotation.x = -Math.PI/2;
		plane.position.x = 0;
		plane.position.y= 0;
		plane.position.z= 0;
		plane.receiveShadow = true;
		scene.add (plane);
		createFinish ();
		timerDrawer = setInterval (frameDrawer, 20);
		timerLogic = setInterval (frameLogic, 20);
	}
		
	start();

	let gridHelper = new THREE.GridHelper (100, 10, "#ff0000","#ff0000");
	scene.add (gridHelper);

	let axes = new THREE.AxisHelper(200);
	scene.add(axes);

	createCube (20, 0, 0 , true);
	createWall (50,50, 1);
	createWall (100,100, 0)
	renderer.render (scene, camera);
	
});
