// "Vanilla" JavaScript
// We're using the P5.JS (https://p5js.org/) library in order to test in 2D what generative art can do.
// We will increment the difficulty in each stage
// 1st stage: simple pointing of line in one direction using the noise function
// 2nd stage: Trying to create a complete drawing using a 4x4 "canva" (there will be multiple canvas) but still staying with our lines
// 3rd stage: adding more complexity and trying to create a multidirectional drawing using the Perlin noise formula
// 4th stage: It's a duplicata of our 2nd stage but we're using our algorithm used in the last stage to create the drawing

var density = 10;
var space = 300 / density;
var pointsTopLeft;
var pointsBottomRight;
var pointsDensity = 0.005;
var topLeft;
var bottomRight;
const offset = 10;

function createVectors(graphics, direction, pointsArray, returned){
  console.log("Graphics", graphics, "Direction", direction, "PointsArray", pointsArray, "Returned ?", returned);
  for (var i = 0; i < pointsArray.length; i++) {
    var r = map(pointsArray[i].x, 0, width, 50, 255);
    var g = map(pointsArray[i].y, 0, height, 50, 255);
    var b = map(pointsArray[i].x, 0, width, 255, 50);

    graphics.fill(r,g,b);

    var angle = map(noise(pointsArray[i].x * pointsDensity, pointsArray[i].y * pointsDensity), direction, 0, 1, 720);

    if (returned === true){
      pointsArray[i].add(createVectors(sin(angle), cos(angle)));
    } else {
      pointsArray[i].add(createVector(cos(angle), sin(angle)));
    };

    graphics.ellipse(pointsArray[i].x, pointsArray[i].y, 1);
  };
};
function setPreferences(graphics, background, angleMode, noiseDetail){
  graphics.background(background);
  graphics.angleMode(angleMode);
  graphics.noiseDetail(noiseDetail);
};
function createPoints(pointsArray, width, height, density){
  console.log(pointsArray)
  space = width / density;
  for (var x = 0; x < width; x+= space) {
    for (var y = 0; y < height; y += space){
      let p = createVector(x, y);
      pointsArray.push(p);
    };
  };
};

// We create the drawable where we'll be able to draw later on
function setup(){
  // At first, it was with the window height and width but then using the Developer tools made the canvas smaller
  // TODO: think of a way to dynamically resize the canvas in order to not lose the focus (and recreate the missing parts
  // TODO: that weren't generated the first time.)
  createCanvas(800, 800);

  topLeft = createGraphics(300, 300);
  bottomRight = createGraphics(300, 300);

  setRightBuffer();
}

function draw() {
    // Draw on your buffers however you like
    drawLeftBuffer();
    drawRightBuffer();
    // Paint the off-screen buffers onto the main canvas
    image(topLeft, 0, 0);
    image(bottomRight, 400, 0);
}

function drawLeftBuffer() {
  topLeft.background(25);
  topLeft.angleMode(DEGREES);
  topLeft.noiseDetail(2);
  space = 400 / density;
  const pointsTopLeft = [];
  for (var x = 0; x < width; x+= space) {
    for (var y = 0; y < height; y += space){
      let p = createVector(x, y);
      pointsTopLeft.push(p);
    };
  };


  for (var i = 0; i < pointsTopLeft.length; i++) {
    var r = map(pointsTopLeft[i].x, 0, width, 50, 255);
    var g = map(pointsTopLeft[i].y, 0, height, 50, 255);
    var b = map(pointsTopLeft[i].x, 0, width, 255, 50);

    topLeft.fill(r,g,b);

    var angle = map(noise(pointsTopLeft[i].x * pointsDensity, pointsTopLeft[i].y * pointsDensity), -2, 0, 1, 720);

    pointsTopLeft[i].add(createVectors(sin(angle), cos(angle)));

    topLeft.ellipse(pointsTopLeft[i].x, pointsTopLeft[i].y, 1);
  };
}

function drawRightBuffer() {
  bottomRight.background(25);
  bottomRight.angleMode(DEGREES);
  bottomRight.noiseDetail(2);
}

function setRightBuffer(){
  space = 400 / density;
  for (var x = 0; x < width; x+= space) {
    for (var y = 0; y < height; y += space){
      let p = createVector(x, y);
      pointsBottomRight.push(p);
    };
  };
}

function setLeftBuffer(){
  space = 400 / density;
  for (var x = 0; x < width; x+= space) {
    for (var y = 0; y < height; y += space){
      let p = createVector(x, y);
      pointsTopLeft.push(p);
    };
  };
}
