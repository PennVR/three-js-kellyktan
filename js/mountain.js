class Mountain {

  constructor (width, height, widthSeg, heightSeg) {
    this._width = width;
    this._height = height;
    this._widthSeg = widthSeg;
    this._heightSeg = heightSeg;

    // let colors = [new THREE.Color(0x4286f4),
    //               new THREE.Color(0x89f442),
    //               new THREE.Color(0xd942f4)];

    this._material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
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
      let color = new THREE.Color(0xffffff);
      color.r = Math.max(0, Math.min (255, 100 + h / 3)) / 255;
      color.g = 72 / 255;
      color.b = 26 / 255;
      this._geometry.colors[i] = color;
    }

    let faceIndices = ['a','b','c','d'];

    for (let i = 0; i < this._geometry.faces.length; i++) {
      let face = this._geometry.faces[i];
      let numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
      for (let j = 0; j < numberOfSides; j++) {
        let vertexIndex = face[ faceIndices[j] ];
        face.vertexColors[j] = this._geometry.colors[vertexIndex];
      }
    }
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
