let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight, 0.1, 10000);
scene.add(camera);

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x19165b );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.VRControls(camera);
let effect = new THREE.VREffect(renderer);

if (navigator.getVRDisplays) {
  navigator.getVRDisplays()
      .then(function(displays) {
          effect.setVRDisplay( displays[ 0 ] );
          controls.setVRDisplay( displays[ 0 ] );
      })
      .catch(function() {
          // no displays
      });
  document.body.appendChild(WEBVR.getButton(effect));
}

let mountain = new Mountain(7500, 7500, 256, 256);
scene.add(mountain.mesh);

let sGeometry = new THREE.SphereGeometry( 10, 32, 32 );
let sMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
let sMesh = new THREE.Mesh(sGeometry, sMaterial);
scene.add(sMesh);

sMesh.position.z = -500;
sMesh.position.y = 2000;

camera.position.z = 700;
camera.position.y = -0;
camera.rotation.x = 1.4;

let animate = () => {
  effect.requestAnimationFrame(animate);
  sMesh.position.z +=5;
  effect.render(scene, camera);
}

controls.update();
animate();
