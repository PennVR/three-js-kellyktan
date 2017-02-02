let noise = (x, y, seed) => {
  let X = Math.floor(x) & 255;
  let Y = Math.floor(y) & 255;
  let Seed = Math.floor(seed) & 255;

  x -= Math.floor(x);
  y -= Math.floor(y);
  seed -= Math.floor(seed);

  let u = fade(x);
  let v = fade(y);
  let w = fade(seed);

  let A = p[X] + Y;
  let AA = p[A]+Seed;
  let AB = p[A+1]+Seed;

  let B = p[X+1]+Y;
  let BA = p[B]+Seed;
  let BB = p[B+1]+Seed;

  return linInterp(w,
          linInterp(v,
              linInterp(u,
                  gradient(p[AA], x, y, seed),
                  gradient(p[BA], x-1, y, seed)),
              linInterp(u,
                  gradient(p[AB], x, y-1, seed),
                  gradient(p[BB], x-1, y-1, seed))
              ),
          linInterp(v,
              linInterp(u,
                  gradient(p[AA+1], x, y, seed-1),
                  gradient(p[BA+1], x-1, y, seed-1)),
              linInterp(u,
                  gradient(p[AB+1], x, y-1, seed-1),
                  gradient(p[BB+1], x-1, y-1, seed-1))
              )
          );
}

let fade = (t) => {
  return 6*t**5 - 15*t**4 + 10*t**3;
}

let linInterp = (t, a, b) => {
  return a + t * (b - a);
}

let gradient = (hash, x, y, seed) => {
  let h = hash & 15;
  let u = h<8 ? x : y;
  let v = h<4 ? y : h==12 || h==14 ? x : seed;

  return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
}

let p = new Array(512);
const permutation = [
       137, 153,  86, 131, 100, 209, 184, 197,  25, 164, 189,  50, 212,
       160,  75, 227,  92,  12, 123, 230, 149,  95,  91,  88, 208,  62,
       115,  38,  21, 203,  51, 220, 249, 134,  49,  22, 158, 155,  77,
        40, 116, 192,   0,  26, 165,  29,  18, 186, 195,  34, 196,  89,
         6, 246, 126, 216,  16, 194, 175, 202,  66, 224,  57, 167, 218,
       226, 128, 193,  30,  35, 251,  80, 213,  31, 103,  90,  94,  70,
       139, 173, 148, 214, 238,  52,  76,  14, 237,  99, 219, 106,  97,
        73, 188, 114, 150, 145, 190, 118,   1,  96,  87, 229,  64,  78,
       205,  11,  10, 147, 250, 151,  59, 156, 157, 146, 125,  93, 223,
        45,   4,  61, 142, 162,  32,  53, 198, 187, 204, 231,   2,  79,
       121,  28, 119, 177, 174, 239,  13,  36, 101,  37,  47, 107, 252,
       112,  63, 217,  74,  39, 102,  68,   3, 132, 240, 235, 179, 178,
       232, 236,  56, 210,  69, 245,  71, 120, 201, 169,  27, 255, 228,
        15, 168, 124, 183, 211,  20, 109,  19,  83,  17, 129, 108,  33,
        43, 191, 248, 144, 127,  42, 172, 130, 171, 161, 110, 159,   7,
       143,  54, 176, 244, 221, 135, 113, 105,  55,  58,  85,  41, 133,
        48, 154,  60, 215, 163, 241, 199,  44, 247, 170, 117, 206,  82,
       253,  81, 254,  23, 141,  98, 138, 225, 140, 200, 181,   8, 182,
       104, 136, 152, 234, 180,   5,  84, 242, 243,  65,  67, 185, 222,
       111,  24,  72, 207, 233,  46,   9, 122, 166
    ];

for (let i = 0; i < 256; i++) {
  p[i] = permutation[i];
  p[256+i] = p[i];
}
