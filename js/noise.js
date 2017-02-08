class Noise {

  constructor (x1, x2, y1, y2) {
    let arr = new Array();
    for (let i = 0; i <= (x2-x1)+1; i++) {
      arr[i] = new Array();
      for (let j = 0; j <= (y2-y1)+1; j++) {
        let vec = [Math.random(), Math.random(), Math.random()];
        arr[i].push(this.normalize(vec));
      }
    }
    this._rand = arr;
    this._x1 = x1;
    this._y1 = y1;
  }

  normalize (v) {
    let len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
    return [v[0]/len, v[1]/len, v[2]/len];
  }

  get rand () { return this._rand }
  set rand (rand) { this.rand = rand }

  get x1 () { return this._x1 }
  set x1 (x1) { this.x1 = x1 }

  get y1 () { return this._y1 }
  set y1 (y1) { this.y1 = y1 }

  distance (v1,v2) {
    let d1 = v2[0]-v1[0];
    let d2 = v2[1]-v1[1];
    let d3 = v2[2]-v1[2];
    return [d1,d2,d3]
  }

  dot (v1,v2) {
    return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
  }

  linearInterpolate (c1, c2, o) {
    return c1 + o * (c2 - c1);
  }

  fade (t) {
    return 6*t**5 - 15*t**4 + 10*t**3;
  }

  noise (x, y, seed) {
    let c00 = [Math.floor(x),Math.floor(y),Math.floor(seed)];
    let c01 = [Math.floor(x),Math.floor(y)+1,Math.floor(seed)];
    let c10 = [Math.floor(x)+1,Math.floor(y),Math.floor(seed)];
    let c11 = [Math.floor(x)+1,Math.floor(y)+1,Math.floor(seed)];

    let c00Rand = this._rand[c00[0]-this._x1][c00[1]-this._y1];
    let c01Rand = this._rand[c01[0]-this._x1][c01[1]-this._y1];
    let c10Rand = this._rand[c10[0]-this._x1][c10[1]-this._y1];
    let c11Rand = this._rand[c11[0]-this._x1][c11[1]-this._y1];

    let orig = [x,y,seed];
    let c00Dist = this.distance(orig,c00);
    let c01Dist = this.distance(orig,c01);
    let c10Dist = this.distance(orig,c10);
    let c11Dist = this.distance(orig,c11);

    let c00Dot = this.dot(c00Dist,c00Rand);
    let c01Dot = this.dot(c01Dist,c01Rand);
    let c10Dot = this.dot(c10Dist,c10Rand);
    let c11Dot = this.dot(c11Dist,c11Rand);

    let lin0010 = this.linearInterpolate(
        c00Dot, c10Dot, this.fade(x-Math.floor(x)));
    let lin0111 = this.linearInterpolate(
        c01Dot, c11Dot, this.fade(x-Math.floor(x)));
    let lin0001 = this.linearInterpolate(
        c00Dot, c01Dot, this.fade(y-Math.floor(y)));
    let lin1011 = this.linearInterpolate(
        c00Dot, c01Dot, this.fade(y-Math.floor(y)));

    let lin00100111 =
        this.linearInterpolate(lin0010, lin0111, this.fade(y-Math.floor(y)));
    let lin00011011 =
        this.linearInterpolate(lin0010, lin0111, this.fade(x-Math.floor(x)));

    return this.linearInterpolate(lin00100111, lin00011011, this.fade(seed-Math.floor(seed)));
  }
}
