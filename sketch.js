/*
    Code along to Daniel Shiffman's coding challenge 146

    Daniel Shiffman
    https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
    https://youtu.be/TOEi6T2mtHo

    2D Ray Casting
    https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-
*/

let width = window.innerWidth / 2, height = window.innerHeight / 2;
let lineCountInput, fovSlider, sizeSlider, renderDistanceSlider, angularVelSlider, darkens2DCheckbox, wallsSlider;
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
    makeSliders();
    
    reset();
}

function reset(){
    walls = [];
    makeRandomWalls(walls, wallsSlider.value());
    makeBorders(walls);
    
    player = new Player(createVector(width/2,height/2), 40, 300, 10);
}

function makeRandomWalls(walls, numToCreate) {
    //make random walls
    for (let i = 0; i < numToCreate; i++){
        let a = createVector(random(width), random(height));
        let b = createVector(random(width), random(height));
        let hue = random(255);
        let c = color(hue, sat, lit);
        let wall = new Boundary(a, b, c);
        walls.push(wall);
    }   
}

function makeBorders(walls){
    //create Boundary walls
    walls.push(new Boundary(createVector(0, 0), createVector(0, height), color(0,0,0)));
    walls.push(new Boundary(createVector(0, height), createVector(width, height), color(0,0,0)));
    walls.push(new Boundary(createVector(width, height), createVector(width, 0), color(0,0,0)));
    walls.push(new Boundary(createVector(width,0), createVector(0,0), color(0,0,0)));
}

function makeSliders() {
    createElement('h2', 'resolution');
    lineCountInput = createSlider(0,1000,300);
    lineCountInput.input(changeLineCount);

    createElement('h2', 'fov');
    fovSlider = createSlider(0,360,60,0);
    fovSlider.input(changeFov);

    createElement('h2', 'size');
    sizeSlider = createSlider(1,50,10,0);
    sizeSlider.input(changeSize);

    createElement('h2', 'render distance');
    renderDistanceSlider = createSlider(10,500,400,0);

    createElement('h2', 'velocity');
    velSlider = createSlider(0.1, 3, 1, 0);

    createElement('h2', 'angular velocity');
    angularVelSlider = createSlider(0.1,3,1,0);

    createElement('h2', 'darken 2d');
    darkens2DCheckbox = createCheckbox('2d-darkness', false);

    createElement('h2', 'number of walls');
    createElement('p', 'note, you need to reset the scene to see new walls');
    wallsSlider = createSlider(1, 10, 5);
}

function draw() {
    noStroke();
    background(0);

    controls();
    const scene = player.show(walls, darkens2DCheckbox.checked());
    visualizeScene(scene);

    for (let wall of walls){
        wall.show(darkens2DCheckbox.checked(), renderDistanceSlider.value());
    }
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
    player.updateSize(sizeSlider.value());
}