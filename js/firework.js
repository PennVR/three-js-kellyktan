class Firework {
  constructor (x, y, z, vel, color, scene) {
    this._color = color;
    this._vel = vel;
    this._hasExploded = false;
    this._scene = scene;
    this._particleNumStream = 20;
    this._particleNum = 45;
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

  get particleNumStream () { return this._particleNumStream }
  set particleNumStream (particleNumStream) {
      this.particleNumStream = particleNumStream }

  get particleNum () { return this._particleNum }
  set particleNum (particleNum) { this.particleNum = particleNum }

  get particleStreams () { return this._particleStreams }
  set particleStreams (particleStreams) {
      this.particleStreams = particleStreams }

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
    if (this._vel[2] <= 0) {
      this.createParticles();
      this._scene.remove(this._rocketMesh);
      this._hasExploded = true;
    } else {
      this._rocketMesh.position.x += this._vel[0];
      this._rocketMesh.position.y += this._vel[1];
      this._rocketMesh.position.z += this._vel[2];
      this._vel[1] -= this._gravity;
    }
  }

  moveParticles () {
    for (let i = 0; i < this._particleNumStream; i++) {
      let prevI =
        (this._particleI + this._particleNum - 1) % this._particleNum;
      this._particleStreams[i].geometry.vertices[this._particleI].x =
          this._particleStreams[i].geometry.vertices[prevI].x
          + this._particleVels[i][0];
      this._particleStreams[i].geometry.vertices[this._particleI].y =
          this._particleStreams[i].geometry.vertices[prevI].y
          + this._particleVels[i][1];
      this._particleStreams[i].geometry.vertices[this._particleI].z =
          this._particleStreams[i].geometry.vertices[prevI].z
          + this._particleVels[i][2];

      this._particleStreams[i].geometry.verticesNeedUpdate = true;
      this._particleVels[i][1] -= this._gravity;
    }
    this._particleI = (this._particleI + 1) % this._particleNum;
  }

  isVisible () {
    let isVisible = false;
    for (let i = 0; i < this._particleNumStream; i++) {
      for (let j = 0; j < this._particleNum; j++) {
        if (this._particleStreams[i].geometry.vertices[j].y > -1200) {
          isVisible = true;
        }
      }
    }
    return isVisible;
  }

  removeParticles () {
    for (let i = 0; i < this._particleStreams; i++) {
      scene.remove(this._particleStreams[i]);
    }
  }

  createParticles () {
    this._particleStreams = new Array(this._particleNumStream);
    this._particleVels = new Array(this._particleNumStream);
    this._particleI = 0;
    let loader = new THREE.TextureLoader();
    let material = new THREE.PointsMaterial({
          color: this._color,
          size: 30,
          map: loader.load("images/particle.png"),
          blending: THREE.AdditiveBlending,
          transparent: true
        });
    for (let i = 0; i < this._particleNumStream; i++) {
      let geometry = new THREE.Geometry();
      for (let j = 0; j < this._particleNum; j++) {
        let x = this._rocketMesh.position.x;
        let y = this._rocketMesh.position.y;
        let z = this._rocketMesh.position.z;
        let particle = new THREE.Vector3(x, y, z);
        geometry.vertices.push(particle);
      }
      this._particleStreams[i] = new THREE.Points(geometry, material);
      this._particleStreams[i].sortParticles = true;
      scene.add(this._particleStreams[i]);

      let theta = 2 * Math.PI / this._particleNumStream * i;
      let smolTheta =
          Math.atan2(this._rocketMesh.position.y, this._rocketMesh.position.x);
      let velMag = 7;
      let vels = new Array(3);
      let horizVel = Math.sin(theta) * velMag;
      vels[0] = Math.sin(smolTheta) * horizVel;
      vels[1] = Math.cos(theta) * velMag;
      vels[2] = -Math.cos(smolTheta) * horizVel;
      this._particleVels[i] = vels;
    }
  }

}
