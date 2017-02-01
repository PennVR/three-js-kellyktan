class Mountain {

  constructor (width, height, widthSeg, heightSeg) {
    this._width = width;
    this._height = height;
    this._widthSeg = widthSeg;
    this._heightSeg = heightSeg;

    this._geometry = new THREE.PlaneGeometry(
        this._width, this._height, this._widthSeg, this._heightSeg);
    this._seed = Math.floor(Math.random() * 200);
    for (let i = 0; i < this._geometry.vertices.length; i++) {
      let dist = Math.sqrt(
          this._geometry.vertices[i].x*this._geometry.vertices[i].x
          + this._geometry.vertices[i].y*this._geometry.vertices[i].y);
      let h = noise(this._geometry.vertices[i].x / 256.0,
          this._geometry.vertices[i].y / 256.0,
          this._seed) * (dist / 6.5);
      this._geometry.vertices[i].z = h;
    }

    //this._material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
    for (let i = 0; i < this._geometry.faces.length; i++) {
      this._geometry.faces[i].vertexColors[0] = new THREE.Color(0x4286f4);
      this._geometry.faces[i].vertexColors[1] = new THREE.Color(0x89f442);
      this._geometry.faces[i].vertexColors[2] = new THREE.Color(0xd942f4);
    }
    // console.log(materials);

    this._material = new THREE.MeshPhongMaterial({
      color: 0x7c5231,
      wireframe: true
    });
    this._mesh = new THREE.Mesh(this._geometry, this._material);
  }

  get width () { return this._width }
  set width (width) { this.width = width }

  get height () { return this._height }
  set height (height) { this.height = height }

  get widthSeg () { return this._widthSeg }
  set widthSeg (widthSeg) { this.widthSeg = widthSeg }

  get heightSeg () { this._heightSeg }
  set heightSeg (heightSeg) { this.heightSeg = heightSeg }

  get seed () { return this._seed }
  set seed (seed) { this.seed }

  get geometry () { return this._geometry }
  set geometry (geometry) { this.geometry = geometry }

  get material () { return this._material }
  set material (material) { this.material = material }

  get mesh () { return this._mesh }
  set mesh (mesh) { this.mesh = mesh }
}
