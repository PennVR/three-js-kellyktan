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

let mountain = new Mountain(7500, 7500, 325, 325);
scene.add(mountain.mesh);

let firework = new Firework(0, 2000, -300, [0, 0, 30], 0xffffff, 1500, scene);
let firework2 = new Firework(1000, 2000, -500, [0, 0, 30], 0x4286f4, 1300, scene);
let firework3 = new Firework(-1000, 2000, -500, [0, 0, 30], 0xf4424e, 1300, scene);

camera.position.z = 700;
camera.rotation.x = 1.4;

let animate = () => {
  effect.requestAnimationFrame(animate);
  firework.move();
  firework2.move();
  firework3.move();
  effect.render(scene, camera);
}

controls.update();
animate();
