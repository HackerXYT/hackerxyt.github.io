import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Dark gray, not pure black
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0.3, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
light.castShadow = true;
light.shadow.mapSize.width = 4096;
light.shadow.mapSize.height = 4096;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 50;
light.shadow.radius = 5;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const loader = new GLTFLoader();
let hoodie = null;

const textureLoader = new THREE.TextureLoader();
const logoTexture = textureLoader.load('474041699_1430013705108670_6045906166762482467_n.png', 
    () => console.log('Texture loaded!'), 
    undefined, 
    (error) => console.error('Error loading texture:', error)
);

const textureLoader2 = new THREE.TextureLoader();
const epsilon = textureLoader2.load('test.png', 
    () => console.log('Epsilon loaded!'), 
    undefined, 
    (error) => console.error('Error loading texture:', error)
);

loader.load('t_shirt_hoodie_3d_model.glb', function (gltf) {
    hoodie = gltf.scene;
    hoodie.traverse((child) => {
        console.log(child.name); // Log actual mesh names

        if (child.isMesh && child.name === 'Hoodie_0') { // Try different names if needed
            child.castShadow = true;
            
            // Apply texture with proper mapping
            child.material = new THREE.MeshStandardMaterial({ 
                map: [logoTexture, epsilon], 
                transparent: true,
                depthWrite: true,
                side: THREE.DoubleSide
            });

            console.log('Texture applied to:', child.name);
        }
    });

    const logoPlaneGeometry = new THREE.PlaneGeometry(0.6, 0.6); // Adjust size
    const logoMaterial = new THREE.MeshBasicMaterial({
        map: logoTexture,
        transparent: true,
    });
    const logoPlane = new THREE.Mesh(logoPlaneGeometry, logoMaterial);

    // Position the logo in front of the hoodie
    logoPlane.position.set(0.45, 0.6, 1.01); // Adjust as needed
    scene.add(logoPlane);

    const logoPlaneGeometry2 = new THREE.PlaneGeometry(1.3, 0.65); // Adjust size
    const logoMaterial2 = new THREE.MeshBasicMaterial({
        map: epsilon,
        transparent: true,
        side: THREE.DoubleSide, // Make logo visible from both sides
    });
    const logoPlane2 = new THREE.Mesh(logoPlaneGeometry2, logoMaterial2);

    // Position the logo in front of the hoodie
    logoPlane2.scale.set(-1, 1, 1); // Flip along the x-axis (inverts the image horizontally)
    logoPlane2.position.set(0, 0.5, -0.8); // Adjust these values for proper alignment behind the hoodie

    scene.add(logoPlane2);

    hoodie.position.set(0, 0, 0);
    hoodie.scale.set(1, 1, 1);
    scene.add(hoodie);
}, undefined, function (error) {
    console.error('Error loading model:', error);
});


//loader.load('t_shirt_hoodie_3d_model.glb', function (gltf) {
//    hoodie = gltf.scene;
//    hoodie.traverse((child) => {
//        if (child.isMesh) child.castShadow = true;
//    });
//    hoodie.position.set(0, 0, 0);
//    hoodie.scale.set(1, 1, 1);
//    scene.add(hoodie);
//}, undefined, function (error) {
//    console.error('Error loading model:', error);
//});

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.85);
composer.addPass(bloomPass);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2; // Limit vertical movement


function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    if (hoodie) hoodie.rotation.x += 0.0001;
    composer.render();
}

animate();