class Firework {
  constructor (xStart, yStart, zExplode) {
    this._xStart = xStart;
    this._yStart = yStart;
    this._zExplode = zExplode;

    this._fire = new THREE.PointLight();
  }

  get fire () { return this._fire }
  set fire (fire) { this.fire = fire }

  get xStart () { return this._xStart }
  set xStart (xStart) { this.xStart = xStart }

  get yStart () { return this._yStart }
  set yStart (yStart) { this.yStart = yStart }

  get zExplode () { return this._zExplode }
  set zExplode (zExplode) { this.zExplode = zExplode }

}
