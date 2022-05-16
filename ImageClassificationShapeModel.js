let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;
function setup() {
  canvas = createCanvas(400, 400);
  let options = {
    inputs: [64, 64, 4],
    task: "imageClassification",
  };
  shapeClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: "./model/model.json",
    metadata: "./model/model_meta.json",
    weights: "./model/model.weights.bin",
  };
  background(255);
  resultsDiv = createDiv("loading model")
  inputImage= createGraphics(64, 64);
  shapeClassifier.load(modelDetails, modelLoaded);
  // console.log("todo bien")
}

function modelLoaded() {
  console.log("model Ready!");
  classifyImage()
}

function classifyImage() {
  
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);
  // image(inputImage,0,0)

  shapeClassifier.classify({ image: inputImage }, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  // console.log(
  //   `estoy un ${Number(results[0].confidence * 100).toFixed(
  //     2
  //   )}% seguro de que es un ${results[0].label}`
  // );
  let label = results[0].label;
  let confidence = nf(100*results[0].confidence,2,0)

  resultsDiv.html(`${label} ${confidence}%`)
  classifyImage()
  // console.log(results[0].confidence);
}

function keyPressed(){
  background(255)
}

function draw() {
  // background(255)
  if (mouseIsPressed) {
    strokeWeight(4);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }


  // stroke(0)
  // noFill()
  // strokeWeight(4)
  // circle(width/2,height/2,40)
}
