class Stars {

  constructor (radius, numStars) {

    let geometry = new THREE.Geometry();

    for (let i = 0; i < numStars; i++) {
      let x = Math.random() * 2 * (radius-1) - radius;
      let z = Math.random() * 2 * (radius-1) - radius;

      let y = Math.sqrt(radius**2 - x**2 - z**2) - 2500;

      if (!isNaN(y)) {
        geometry.vertices.push(new THREE.Vector3(x, y, z));
      }
    }

    //let loader = new THREE.TextureLoader();
    let material = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 30,
          // map: loader.load("images/particle.png"),
          // blending: THREE.AdditiveBlending,
          // transparent: true
        });

    this._mesh = new THREE.Points(geometry, material);
    this._mesh.sortParticles = true;

  }

  get mesh () { return this._mesh }
  set mesh (mesh) { this.mesh = mesh }

}
