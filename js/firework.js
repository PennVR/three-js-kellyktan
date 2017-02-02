class Firework {
  constructor (x, y, z, vel, color, zExplode, scene) {
    this._zExplode = zExplode;
    this._color = color;
    this._vel = vel;
    this._hasExploded = false;
    this._scene = scene;

    let geometry = new THREE.SphereGeometry( 10, 32, 32 );
    let material = new THREE.MeshBasicMaterial( { color: this._color } );
    this._rocketMesh = new THREE.Mesh(geometry, material);

    this._rocketMesh.position.x = x
    this._rocketMesh.position.y = y
    this._rocketMesh.position.z = z
    this._scene.add(this._rocketMesh);
  }

  get scene () { return this._scene }
  set scene (scene) { this.scene = scene }

  get zExplode () { return this._zExplode }
  set zExplode (zExplode) { this.zExplode = zExplode }

  get color () { return this._color }
  set color (color) { this.color = color }

  get vel () { return this._vel }
  set vel (vel) { this.vel = vel }

  get hasExploded () { return this._hasExploded }
  set hasExploded (hasExploded) { this.hasExploded = hasExploded }

  get rocketMesh () { return this._rocketMesh }
  set rocketMesh (rocketMesh) { this.rocketMesh = rocketMesh }

  get particleMeshes () { return this._particleMeshes }
  set particleMeshes (particleMeshes) { this.particleMeshes = particleMeshes }

  move () {
    if (!this._hasExploded) {
      this.moveRocket();
    } else {
      this.moveParticles();
    }
  }

  moveRocket () {
    this._rocketMesh.position.x += this._vel[0];
    this._rocketMesh.position.y += this._vel[1];
    this._rocketMesh.position.z += this._vel[2];
    if (this._rocketMesh.position.z >= this._zExplode) {
      this._scene.remove(this._rocketMesh);
      this.createParticles();
      this._hasExploded = true;
    }
  }

  moveParticles () {
    let velMag = 5;
    for (let i = 0; i < 10; i++) {
      let theta = 2 * Math.PI / 10 * i;
      this._particleMeshes[i].position.x += Math.sin(theta) * velMag;
      this._particleMeshes[i].position.z += Math.cos(theta) * velMag;
    }
  }

  createParticles () {
    this._particleMeshes = new Array(10);
    for (let i = 0; i < 10; i++) {
      let geometry = new THREE.SphereGeometry( 10, 32, 32 );
      let material = new THREE.MeshBasicMaterial( { color: this._color } );
      this._particleMeshes[i] = new THREE.Mesh(geometry, material);
      this._particleMeshes[i].position.x = this._rocketMesh.position.x;
      this._particleMeshes[i].position.y = this._rocketMesh.position.y;
      this._particleMeshes[i].position.z = this._rocketMesh.position.z;
      this._scene.add(this._particleMeshes[i]);
    }
  }

}
