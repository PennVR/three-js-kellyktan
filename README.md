# Three.js Project
### Kelly Tan

Here is a link to a demo: https://pennvr.github.io/three-js-kellyktan/

To generate the terrain, I implemented the Perlin Noise algorithm and applied it to the coordinates of my plane to generate the heights.  I scaled the noise with the distance from the center to give the user a feeling of being in the middle of a valley.  To produce fireworks, I used a sphere to represent the rocket and a string of particles to represent the explosion and fallout.  I applied gravity to each component of the fireworks gravity to give them a realistic appearance.

To build this, install the Node.js HTTP server package by running `npm install http-server -g` in your terminal.  Then, from the project directory, run the command `http-server`.  Navigate to the give address.

When in VR mode, I don't feel any motion sickness because the scene moves according to my movements and the terrain is static with respect to the outside world.

The hardest part of the assignment was getting myself up to speed on Javascript, since I've never built a webapp before, and implementing the noise function in a way that produced a reasonable terrain.

I wish I had known that the y-axis was up instead of the z-axis.

I wish you had gone over ways to make the noise function appear smoother.
