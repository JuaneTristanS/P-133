stat = "";
object = [];

function preload() {
    img = loadImage("img1.jpg");
}

function setup() {
    canvas = createCanvas(700, 350);
    canvas.center();

    object = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";
}

function ModelLoaded() {
    console.log("The model has been initialised");
    object.detect(img, gotResults);

    stat = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(img, 0, 0, 700, 350);

    if (stat != "") {
        for (i = 0; i < object.length; i++) {
            fill("red");
            percent = Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 10, object[i].y + 10);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            document.getElementById("status").innerHTML = "Objects Detected";

        }
    }




}