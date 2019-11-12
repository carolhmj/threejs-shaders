//Set up scene and initial camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

//Load textures
const textures = [];
textures[0] = new THREE.TextureLoader().load('../textures/mountains.jpg');
textures[1] = new THREE.TextureLoader().load('../textures/coffee.jpg');

//Load shaders
const reader = new XMLHttpRequest();
reader.open("GET", "js/vertex.glsl", false);
let vertexShader;
reader.onload = (e) => {
	vertexShader = reader.responseText;
	console.log("vertexShader =========\n", vertexShader);
}
reader.send();

reader.open("GET", "js/frag2.glsl", false);
let fragmentShader;
reader.onload = (e) => {
	fragmentShader = reader.responseText;
	console.log("fragmentShader =========\n", fragmentShader);
}
reader.send();

var material = new THREE.ShaderMaterial({
	vertexShader,
	fragmentShader,
	uniforms: {
		time: {value: 0.0},
		texture1: {value: textures[0]},
		texture2: {value: textures[1]},
		screen: {value: [window.innerWidth, window.innerHeight]}
	}
});


//Set up geometry and adjust camera
const geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

camera.position.z = 1;

const setCamera = function(plane, camera, width, height) {
	const dist = camera.position.z - plane.position.z;
	camera.aspect = width / height;
	console.log('aspect ratio' + camera.aspect);
	camera.fov = 2 * Math.atan(1 / (2*camera.position.z)) * (180/Math.PI);
	plane.scale.x = camera.aspect;
	camera.updateProjectionMatrix();
}
setCamera(plane, camera, window.innerWidth, window.innerHeight);


let sign = 1;
const delta = 0.01;

const animate = function () {
	requestAnimationFrame(animate);
	material.uniforms.time.value += delta * sign;
	renderer.render(scene, camera);
};

animate();