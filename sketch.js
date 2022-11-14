/*
    Code along to Daniel Shiffman's coding challenge 146

    Daniel Shiffman
    https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
    https://youtu.be/TOEi6T2mtHo

    2D Ray Casting
    https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-
*/

let width = window.innerWidth / 2, height = window.innerHeight / 2;
let lineCountInput, fovSlider, sizeSlider, renderDistanceSlider, angularVelSlider;
let sat = 80, lit = 80;
let walls;
let pos;

let player;

//TODO: Collision blocks movement
//darken 2d lines based on 3d darkness (distance)
//sliders
//key pressed light up

function setup() {
    createCanvas(width * 2,height);
    colorMode(HSL);
    
    makeRandomWalls();
    makeSliders();
    
    player = new Player(createVector(width/2,height/2), 40, 300, 10);
}

function makeRandomWalls() {
    walls = [];
    //make random walls
    for (let i = 0; i < 5; i++){
        let a = createVector(random(width), random(height));
        let b = createVector(random(width), random(height));
        let hue = random(255);
        let c = color(hue, sat, lit);
        let wall = new Boundary(a, b, c);
        walls.push(wall);
    }

    //create Boundary walls
    walls.push(new Boundary(createVector(0, 0), createVector(0, height), color(0,0,0)));
    walls.push(new Boundary(createVector(0, height), createVector(width, height), color(0,0,0)));
    walls.push(new Boundary(createVector(width, height), createVector(width, 0), color(0,0,0)));
    walls.push(new Boundary(createVector(width,0), createVector(0,0), color(0,0,0)));
}

function makeSliders() {
    lineCountInput = createSlider(0,1000,300);
    lineCountInput.input(changeLineCount);

    fovSlider = createSlider(0,360,60);
    fovSlider.input(changeFov);

    sizeSlider = createSlider(1,50,10);
    sizeSlider.input(changeSize);

    renderDistanceSlider = createSlider(10,500,400);

    velSlider = createSlider(0.1, 3, 1);

    angularVelSlider = createSlider(0.1,3,1);
}

function draw() {
    noStroke();
    background(0);

    controls();

    for (let wall of walls){
        wall.show();
    }
    const scene = player.show(walls);
    visualizeScene(scene);
}

function visualizeScene(scene) {
    push();
    translate(width, 0);
    rectMode(CENTER);
    noStroke();
    const w = width / scene.distances.length;
    for (let i = 0; i < scene.distances.length; i++) {
        const d = scene.distances[i];
        const c = scene.colors[i];
        const b = map(d, 0, renderDistanceSlider.value(), 0.75, 0);
        c.setAlpha(b);
        fill(c)
        const h = map(d, 0, width, height, 0);
        rect(i * w + w/2, height / 2, w+1, h);
    }
    pop();
}

function controls(){
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        player.rotate(-angularVelSlider.value());
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        player.rotate(angularVelSlider.value());
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)){
        player.move(velSlider.value());
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){
        player.move(-velSlider.value());
    }
}

//lineCountInput, fovSlider, sizeSlider, renderDistanceSlider, renderDistance=400, angularVelSlider, angularVel=1;

function changeLineCount(){
    player.updateDetails(lineCountInput.value());
}

function changeFov(){
    player.updateFov(fovSlider.value());
}

function changeSize(){

}