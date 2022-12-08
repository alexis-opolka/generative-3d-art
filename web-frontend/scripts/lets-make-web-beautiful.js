// "Vanilla" JavaScript
// We're using the P5.JS (https://p5js.org/) library in order to test in 2D what generative art can do.
// We will increment the difficulty in each stage
// 1st stage: simple pointing of line in one direction using the noise function
// 2nd stage: Trying to create a complete drawing using a 4x4 "canva" (there will be multiple canvas) but still staying with our lines
// 3rd stage: adding more complexity and trying to create a multidirectional drawing using the Perlin noise formula
// 4th stage: It's a duplicata of our 2nd stage but we're using our algorithm used in the last stage to create the drawing

var points = []
var mult = 0.005

// We create the drawable where we'll be able to draw later on
function setup(){
  // At first, it was with the window height and width but then using the Developer tools made the canvas smaller
  // TODO: think of a way to dynamically resize the canvas in order to not lose the focus (and recreate the missing parts
  // TODO: that weren't generated the first time.)
  createCanvas(innerWidth, innerHeight)
  background(30)
  angleMode(DEGREES)
  noiseDetail(10)

  var density = 80
  var space = width / density

  for (var x = 0; x < width; x+= space) {
    for (var y = 0; y < height; y += space){
      var p = createVector(x, y)
      points.push(p)
    }
  }
}

function draw(){
  noStroke()
  fill(255)

  for (var i = 0; i < points.length; i++) {
    var r = map(points[i].x, 0, width, 50, 255)
    var g = map(points[i].y, 0, height, 50, 255)
    var b = map(points[i].x, 0, width, 255, 50)

    fill(r,g,b)
    // We're adding some noise over the creation of points at direction
    if (i < points.length / 2) {
      var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720)
    } else {
      var angle = map(noise(points[i].x * mult+1, points[i].y * mult+2), 0, 1, 1, 720)
    }

    points[i].add(createVector(sin(angle), cos(angle)))

    ellipse(points[i].x, points[i].y, 1)
  }
}
