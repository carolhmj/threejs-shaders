class Renderer {
	init() {
		//Set up scene and initial camera
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('container')
		.appendChild(this.renderer.domElement);

		//Load textures
		const textures = [];
		textures[0] = new THREE.TextureLoader().load('textures/mountains.jpg');
		textures[1] = new THREE.TextureLoader().load('textures/coffee.jpg');

		//Load shaders
		const reader = new XMLHttpRequest();
		reader.open("GET", "js/vertex.glsl", false);
		let vertexShader;
		reader.onload = (e) => {
			vertexShader = reader.responseText;
			console.log("vertexShader =========\n", vertexShader);
		}
		reader.send();

		reader.open("GET", "js/frag_circle.glsl", false);
		let fragmentShaderCircle;
		reader.onload = (e) => {
			fragmentShaderCircle = reader.responseText;
			console.log("fragmentShader circle =========\n", fragmentShaderCircle);
		}
		reader.send();


		reader.open("GET", "js/frag_distortion.glsl", false);
		let fragmentShaderDistortion;
		reader.onload = (e) => {
			fragmentShaderDistortion = reader.responseText;
			console.log("fragmentShader distortion =========\n", fragmentShaderDistortion);
		}
		reader.send();

		this.startTime = Date.now();
		
		const uniforms = {
			time: {value: 0.0},
			texture1: {value: textures[0]},
			texture2: {value: textures[1]},
			screen: {value: [window.innerWidth, window.innerHeight]}
		};

		const circleMaterial = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader: fragmentShaderCircle,
			uniforms: uniforms	
		});		
		this.material = circleMaterial;
		
		const distortionMaterial = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader: fragmentShaderDistortion,
			uniforms: uniforms
		});

		// Add buttons to switch between shaders
		const distortionButton = document.getElementById('button-distortion');
		distortionButton.onclick = () => {
			this.material = this.plane.material = distortionMaterial;
		};
		const circleButton = document.getElementById('button-circle');
		circleButton.onclick = () => {
			this.material = this.plane.material = circleMaterial;
		};

		//Set up geometry and adjust camera
		const geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
		this.plane = new THREE.Mesh(geometry, this.material);

		this.scene.add(this.plane);

		this.camera.position.z = 1;

		const setCamera = function(plane, camera, width, height) {
			const dist = camera.position.z - plane.position.z;
			camera.aspect = width / height;
			console.log('aspect ratio' + camera.aspect);
			camera.fov = 2 * Math.atan(1 / (2*camera.position.z)) * (180/Math.PI);
			plane.scale.x = camera.aspect;
			camera.updateProjectionMatrix();
		}
		setCamera(this.plane, this.camera, window.innerWidth, window.innerHeight);


	}
	
	animate() {
		requestAnimationFrame(this.animate.bind(this));
		this.material.uniforms.time.value += Date.now() - this.startTime;
		this.renderer.render(this.scene, this.camera);
	};
}

const renderer = new Renderer();
renderer.init();
renderer.animate();