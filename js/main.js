let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight, 0.1, 10000);
scene.add(camera);

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff );
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

let mtGeometry = new THREE.PlaneGeometry(7500, 7500, 256, 256);

let z = Math.floor(Math.random() * 200);
//let z = 50;

// let materialChooser = [new THREE.MeshBasicMaterial({color: 0x4286f4}),
//                        new THREE.MeshBasicMaterial({color: 0x89f442}),
//                        new THREE.MeshBasicMaterial({color: 0xd942f4}),
//                        new THREE.MeshBasicMaterial({color: 0xf46b42})];

// let materials = new Array(mtGeometry.faces.length);

for (let i = 0; i < mtGeometry.vertices.length; i++) {
  let dist = Math.sqrt(mtGeometry.vertices[i].x*mtGeometry.vertices[i].x
                       + mtGeometry.vertices[i].y*mtGeometry.vertices[i].y);
  let h = noise(mtGeometry.vertices[i].x / 256.0,
                mtGeometry.vertices[i].y / 256.0,
                z) * (dist / 6.5);
  mtGeometry.vertices[i].z = h;
}
// for (let i = 0; i < mtGeometry.faces.length; i++) {
//   materials[i] = materialChooser[i % 4];
// }
// console.log(materials);

let material = new THREE.MeshPhongMaterial({
  color: 0x7c5231,
  wireframe: true
});
let mountain = new THREE.Mesh(mtGeometry, material);

scene.add(mountain);

camera.position.z = 700;
camera.position.y = -0;
camera.rotation.x = 1;

let animate = () => {
  effect.requestAnimationFrame(animate);
  render();
}

controls.update();
effect.render(scene, camera);
