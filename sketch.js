/*
Code along to Daniel Shiffman's coding challenge 146
*/

let width = window.innerWidth / 2, height = window.innerHeight / 2;
let lineCountInputSlider, fovSlider, sizeSlider, visibilitySlider;
let walls = [];
let pos;

let player;

function setup(){
    createCanvas(width * 2,height);

    player = new Player(createVector(width/2,height/2), );
    
    //create Boundary walls
    // walls.push(new Boundary(createVector(0, 0), createVector(0, height)));
    // walls.push(new Boundary(createVector(0, height), createVector(width, height)));
    // walls.push(new Boundary(createVector(width, height), createVector(width, 0)));
    // walls.push(new Boundary(createVector(width,0), createVector(0,0)));

    walls.push(new Boundary(createVector(20, 20), createVector(200, 200)));
}

function draw(){
    background(0);
    player.update(createVector(mouseX, mouseY));
    for (let wall of walls){
        wall.show();
    }
    player.show(walls);
}