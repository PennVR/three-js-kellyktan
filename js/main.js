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

let fireworks = [new Firework(0, 2000, -300, [0, 0, 30], 0xffffff, 1500, scene),
    new Firework(1000, 1500, -500, [0, 0, 30], 0x4286f4, 1300, scene),
    new Firework(-1000, 1500, -500, [0, 0, 30], 0xf4424e, 1300, scene)];

camera.position.z = 700;
camera.rotation.x = 1.4;

let animate = () => {
  effect.requestAnimationFrame(animate);

  for (let i = 0; i < fireworks.length; i++) {
    if (!fireworks[i].hasExploded || fireworks[i].isVisible()) {
      fireworks[i].move();
    } else {
      fireworks[i].removeParticles();
      if (i == 0) {
        fireworks[i] = new Firework(0, 2000, -300, [0, 0, 30], 0xffffff, 1500, scene);
      } else if (i == 1) {
        fireworks[i] = new Firework(1000, 1500, -500, [0, 0, 30], 0x4286f4, 1300, scene);
      } else {
        fireworks[i] = new Firework(-1000, 1500, -500, [0, 0, 30], 0xf4424e, 1300, scene);
      }
    }
  }
  effect.render(scene, camera);
}

controls.update();
animate();
