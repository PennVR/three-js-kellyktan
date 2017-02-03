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

  get particleI () { return this._particleI }
  set particleI (particleI) { this.particleI = particleI }

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
      let prevI =
        (this._particleI + this._particleNum - 1) % this._particleNum;
      this._particleMeshes[i][this._particleI].position.x =
          this._particleMeshes[i][prevI].position.x + this._particleVels[i][0];
      this._particleMeshes[i][this._particleI].position.y =
          this._particleMeshes[i][prevI].position.y + this._particleVels[i][1];
      this._particleMeshes[i][this._particleI].position.z =
          this._particleMeshes[i][prevI].position.z + this._particleVels[i][2];

      this._particleVels[i][2] -= this._gravity;
    }
    this._particleI = (this._particleI + 1) % this._particleNum;
  }

  createParticles () {
    this._particleMeshes = new Array(this._particleNum);
    this._particleVels = new Array(this._particleNum);
    this._particleI = 0;
    for (let i = 0; i < this._particleNum; i++) {

      this._particleMeshes[i] = new Array(this._particleNum);
      for (let j = 0; j < this._particleNum; j++) {
        let geometry = new THREE.SphereGeometry( 10, 32, 32 );
        let material = new THREE.MeshBasicMaterial( { color: this._color } );
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = this._rocketMesh.position.x;
        mesh.position.y = this._rocketMesh.position.y;
        mesh.position.z = this._rocketMesh.position.z;
        this._scene.add(mesh);

        this._particleMeshes[i][j] = mesh;

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

}
