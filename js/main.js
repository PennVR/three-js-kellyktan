let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight, 0.1, 50000);
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

if ( WEBVR.isAvailable() === false ) {
  document.body.appendChild( WEBVR.getMessage() );
}

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

let mountain = new Mountain(10000, 10000, 24, 24);
scene.add(mountain.mesh);

let stars = new Stars(10000, 3000);
scene.add(stars.mesh);

let fireworkColors = [0xffffff, 0xff2b2b, 0xff8421, 0xffe41e, 0x65ff1e,
    0x3fffd5, 0x3fd5ff, 0x9028ff, 0xff28d7];

let generateRandomFirework = () => {
  let distance = Math.floor((Math.random() * 2000) + 3000);
  let direction = Math.random() * 2 * Math.PI;
  let x = Math.sin(direction) * distance;
  let y = Math.floor((Math.random() * -400) - 900);
  let z = Math.cos(direction) * distance;
  let color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
  return new Firework(x, y, z, [0, 40, 0], color, scene);
}

let fireworks = [];

//camera.rotation.x = -Math.PI/2;
//camera.position.y = 20000;

let animate = () => {
  effect.requestAnimationFrame(animate);

  let newFireworks = [];
  if (Math.random() < 0.02) {
    newFireworks.push(generateRandomFirework());
  }
  for (let i = 0; i < fireworks.length; i++) {
    if (!fireworks[i].hasExploded || fireworks[i].isVisible()) {
      fireworks[i].move();
      newFireworks.push(fireworks[i]);
    } else {
      fireworks[i].removeParticles();
    }
  }
  fireworks = newFireworks;

  controls.update();
  effect.render(scene, camera);
}

animate();
