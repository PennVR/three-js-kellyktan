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

camera.position.z = 700;
camera.position.y = -0;
camera.rotation.x = 1;

let animate = () => {
  effect.requestAnimationFrame(animate);
  render();
}

controls.update();
effect.render(scene, camera);
