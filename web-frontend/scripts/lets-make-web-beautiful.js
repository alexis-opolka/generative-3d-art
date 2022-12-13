// "Vanilla" JavaScript
// We're using the P5.JS (https://p5js.org/) library in order to test in 2D what generative art can do.
// We will increment the difficulty in each stage
// 1st stage: simple pointing of line in one direction using the noise function
// 2nd stage: Trying to create a complete drawing using a 4x4 "canva" (there will be multiple canvas) but still staying with our lines
// 3rd stage: adding more complexity and trying to create a multidirectional drawing using the Perlin noise formula
// 4th stage: It's a duplicata of our 2nd stage but we're using our algorithm used in the last stage to create the drawing

if (innerHeight > innerWidth) {
  var density = (innerHeight/innerWidth)*10
} else if (innerWidth > innerHeight) {
  var density = (innerWidth/innerHeight)*20
}

//var density = (innerHeight/innerWidth)*20 // (innerWidth/innerHeight)*10;
var space = 300 / density;
let pointsTopLeft;
let pointsBottomRight;
let unifiedPoints = [];
var pointsDensity = 0.005;
var topLeft;
var bottomRight;
const offset = 10;
const separatedParticles = false;

// We create the drawable where we'll be able to draw later on
function setup(){
  // At first, it was with the window height and width but then using the Developer tools made the canvas smaller
  // TODO: think of a way to dynamically resize the canvas in order to not lose the focus (and recreate the missing parts
  // TODO: that weren't generated the first time.)
  createCanvas(800, 800);

  if (separatedParticles) {
    topLeft = createGraphics(300, 300);
    bottomRight = createGraphics(300, 300);

    setLeftBuffer();
    setRightBuffer();
  } else {
    if (window.innerWidth < 800 && window.innerHeight > 800) {
      createCanvas(innerWidth, 800)
    } else if (window.innerHeight < 800 && window.innerWidth > 800) {
      createCanvas(800, innerHeight)
    } else if (window.innerHeight < 800 && window.innerWidth < 800) {
      createCanvas(innerWidth, innerHeight)
    } else {
      createCanvas(800, 800);
    }
    background(25);
    angleMode(DEGREES);
    noiseDetail(2);
    space = 400 / density;

    for (var x = 0; x < width; x+= space) {
      for (var y = 0; y < height; y += space){
        let p = createVector(x, y);
        unifiedPoints.push(p);
      }
    }
  }
}

function draw() {
  if (separatedParticles) {
        // Draw on your buffers however you like
    drawLeftBuffer();
    drawRightBuffer();
    // Paint the off-screen buffers onto the main canvas
    image(topLeft, 0, 0);
    image(bottomRight, 300, 0);
  } else {
    noStroke()
    fill(255)

    for (var i = 0; i < unifiedPoints.length; i++) {
      var r = map(unifiedPoints[i].x, 0, width, 50, 255);
      var g = map(unifiedPoints[i].y, 0, height, 50, 255);
      var b = map(unifiedPoints[i].x, 0, width, 255, 50);

      fill(r,g,b);

      var angle = map(noise(unifiedPoints[i].x * pointsDensity, unifiedPoints[i].y * pointsDensity), 2, 0, 1, 720);

      unifiedPoints[i].add(createVector(sin(angle), cos(angle)));

      ellipse(unifiedPoints[i].x, unifiedPoints[i].y, 1);
    }
  }
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
    }
  }


  for (var i = 0; i < pointsTopLeft.length; i++) {
    var r = map(pointsTopLeft[i].x, 0, width, 50, 255);
    var g = map(pointsTopLeft[i].y, 0, height, 50, 255);
    var b = map(pointsTopLeft[i].x, 0, width, 255, 50);

    topLeft.fill(r,g,b);

    var angle = map(noise(pointsTopLeft[i].x * pointsDensity, pointsTopLeft[i].y * pointsDensity), -2, 0, 1, 720);

    pointsTopLeft[i].add(createVector(sin(angle), cos(angle)));

    topLeft.ellipse(pointsTopLeft[i].x, pointsTopLeft[i].y, 1);
  }
}

function drawRightBuffer() {
  bottomRight.background(25);
  bottomRight.angleMode(DEGREES);
  bottomRight.noiseDetail(2);


  for (var i = 0; i < pointsBottomRight.length; i++) {
    var r = map(pointsBottomRight[i].x, 0, width, 50, 255);
    var g = map(pointsBottomRight[i].y, 0, height, 50, 255);
    var b = map(pointsBottomRight[i].x, 0, width, 255, 50);

    topLeft.fill(r,g,b);

    var angle = map(noise(pointsBottomRight[i].x * pointsDensity, pointsBottomRight[i].y * pointsDensity), -2, 0, 1, 720);

    pointsBottomRight[i].add(createVector(sin(angle), cos(angle)));

    ellipse(pointsBottomRight[i].x, pointsBottomRight[i].y, 1);
  }
}

function setRightBuffer(){
  pointsBottomRight = [];
  space = 400 / density;
  for (var x = 0; x < width; x+= space) {
    for (var y = 0; y < height; y += space){
      let p = createVector(x, y);
      pointsBottomRight.push(p);
    }
  }
}

function setLeftBuffer(){
  pointsTopLeft = [];
  space = 400 / density;
  for (var x = 0; x < width; x+= space) {
    for (var y = 0; y < height; y += space){
      let p = createVector(x, y);
      pointsTopLeft.push(p);
    }
  }
}
