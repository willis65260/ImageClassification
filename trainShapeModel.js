let circles = [];
let triangles = [];
let squares = [];
let cir;

function preload() {
  // cir = loadImage("./data/circulo1.png")
  for (let i = 1; i < 101; i++) {
    // let index = nf(i + 1, 4, 0);
    circles[i] = loadImage("./data/circle" + i + ".png");
    triangles[i] = loadImage("./data/triangle" + i + ".png");
    squares[i] = loadImage("./data/square" + i + ".png");
  }
}

let shapeClassifier;

function setup() {
  createCanvas(400, 400);
  background(0);
  // image(circles[0], 0, 0, circles[1].width, circles[1].height)
  let options = {
    inputs: [64, 64, 4],
    task: "imageClassification",
    debug: true,
  };
  shapeClassifier = ml5.neuralNetwork(options);
  for (let i = 1; i < 101; i++) {
    shapeClassifier.addData({ image: circles[i] }, { label: "circle" });
    shapeClassifier.addData({ image: triangles[i] }, { label: "triangle" });
    shapeClassifier.addData({ image: squares[i] }, { label: "square" });
  }
  console.log("todo bien");
  shapeClassifier.normalizeData();
  shapeClassifier.train({epochs:150},finished);
}

function finished() {
  console.log("termino");
  shapeClassifier.save();
}
