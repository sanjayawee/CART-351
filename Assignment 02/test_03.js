let mountains_01 = [];
let mountains_02 = [];
let c1;
let c2;



let numberOfStars = 180;
let minSizeOfStars = 2;
let maxSizeOfStars = 10;
let easing = 0.05;
let mic;

let stars = [];
let particles = [];
let pool = [];


function setup(){
  createCanvas(innerWidth,innerHeight);
  mic = new p5.AudioIn()
  mic.start();
//  colorMode(HSB,1);
//  blendMode(ADD);
  noStroke();

  c1 = color(0, 18, 62);
  c2 = color(150);
  mountains_01 = new Mountain(height - 60, height - 350, false);
  mountains_02 = new Mountain(height - 20, height - 250, true);

for (let i = 0; i < numberOfStars; i++) {
  let radius = Math.random()* 3 + 1;
  let x = Math.random()*(innerWidth-radius*2)+radius;
  let y = Math.random()*(innerHeight-radius*2)+radius;
  let dx = Math.random(-1,1);
  let dy = Math.random(-1,1);
  let speedFactor = random(0.2, 2);
  let weight = random(minSizeOfStars, maxSizeOfStars);
  stars[i] = new Stars(x,y,dx,dy,radius,speedFactor,weight);
}
}

function draw() {
 clear();
 setGradient(0, 0, width, height, c1, c2);
 mountains_01.drawMountain();
 mountains_01.moveMountain();
 mountains_02.drawMountain();
 mountains_02.moveMountain();

    micLevel = mic.getLevel(.9);
  for(let i = 0; i < stars.length; i++)
  {
  stars[i].move(micLevel);

  stars[i].show(micLevel);
  stars[i].reAppear();
//  stars[i].mouseIntraction();

  }





}

class Stars {
  constructor(tempx,tempy,tempdx,tempdy,tempradius,tempspeedFactor,tempweight) {
     this.x = tempx;
     this.y = tempy;
     this.speedFactor = tempspeedFactor;
     this.weight = tempweight;
     this.dx = tempdx;
     this.dy = tempdy;
     this.m = random(100,200);


      this.c = random();
     //this.c = "rgb(0,255,0)";

     this.theta = random(PI);
      this.drag = 0.92;
      this.dx = sin(this.theta);
      this.dy = cos(this.theta);


     this.radius = tempradius;
  }

move(level){

    this.x += this.dx ;
    this.y += this.dy ;

}

show(level){

  // stroke(this.color);
  // strokeWeight(this.weight);
  // point(this.x,this.y);
  push();
  colorMode(HSB,1);
  blendMode(ADD);
  let c = random();

  fill(255);
  ellipse(this.x, this.y, this.m*level);
  pop();
}

reAppear(){
  if (this.x >= width + this.weight) {
    this.x = 0 - this.weight;
  } else if (this.x <= 0 - this.weight) {
    this.x = width + this.weight;
  } else if (this.y >= height + this.weight) {
    this.y = 0 - this.weight;
  } else if (this.y <= 0 - this.weight) {
    this.y = height + this.weight;
  }
}

mouseIntraction(){
  if(mouseX - this.x <100 && mouseX - this.x > -100 && mouseY - this.y < 100 && mouseY - this.y > -100){
     let targetX = mouseX;
     let vx = targetX - this.x;
     this.x += vx * easing;

     let targetY = mouseY;
     let vy = targetY - this.y;
     this.y += vy * easing;
     }
}


}
