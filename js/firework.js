class Firework {
  constructor (x, y, z, vel, color, zExplode, scene) {
    this._zExplode = zExplode;
    this._color = color;
    this._vel = vel;
    this._hasExploded = false;
    this._scene = scene;
    this._particleNum = 20;
    this._gravity = .25;

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

  get gravity () { return this._gravity }
  set gravity (gravity) { this.gravity = gravity }

  get hasExploded () { return this._hasExploded }
  set hasExploded (hasExploded) { this.hasExploded = hasExploded }

  get rocketMesh () { return this._rocketMesh }
  set rocketMesh (rocketMesh) { this.rocketMesh = rocketMesh }

  get particleNum () { return this._particleNum }
  set particleNum (particleNum) { this.particleNum = particleNum }

  get particleMeshes () { return this._particleMeshes }
  set particleMeshes (particleMeshes) { this.particleMeshes = particleMeshes }

  get particleVels () { return this._particleVels }
  set particleVels (particleVels) { this.particleVels = particleVels }

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
    this._vel[2] -= this._gravity;
    if (this._rocketMesh.position.z >= this._zExplode) {
      this.createParticles();
      this._scene.remove(this._rocketMesh);
      this._hasExploded = true;
    }
  }

  moveParticles () {
    for (let i = 0; i < this._particleNum; i++) {
      this._particleMeshes[i].position.x += this._particleVels[i][0];
      this._particleMeshes[i].position.y += this._particleVels[i][1];
      this._particleMeshes[i].position.z += this._particleVels[i][2];

      this._particleVels[i][2] -= this._gravity;
    }
  }

  createParticles () {
    this._particleMeshes = new Array(this._particleNum);
    this._particleVels = new Array(this._particleNum);
    for (let i = 0; i < this._particleNum; i++) {

      let geometry = new THREE.SphereGeometry( 10, 32, 32 );
      let material = new THREE.MeshBasicMaterial( { color: this._color } );
      this._particleMeshes[i] = new THREE.Mesh(geometry, material);
      this._particleMeshes[i].position.x = this._rocketMesh.position.x;
      this._particleMeshes[i].position.y = this._rocketMesh.position.y;
      this._particleMeshes[i].position.z = this._rocketMesh.position.z;
      this._scene.add(this._particleMeshes[i]);

      let theta = 2 * Math.PI / this._particleNum * i;
      let velMag = 5;
      let vels = new Array(3);
      vels[0] = Math.sin(theta) * velMag;
      vels[1] = 0;
      vels[2] = Math.cos(theta) * velMag;
      this._particleVels[i] = vels;
    }
  }

}
