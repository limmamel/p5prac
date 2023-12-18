let particles = [];
let windSlider;

function setup() {
  createCanvas(720, 720);
  background(0);

  windSlider = createSlider(-0.01, 0.01, 0, 0.001);
  windSlider.position(10, height + 10);
}

function draw() {
  translate(width / 2, height / 2);

  let windSpeed = windSlider.value();
  let wind = createVector(windSpeed, 0);

  for (let i = 0; i < particles.length; i++) {
    particles[i].applyWind(wind);
    particles[i].update();
    particles[i].display();
  }

  particles = particles.filter(p => !p.isOutOfBounds());

  if (frameCount % 2 === 0 && particles.length < 500) {
    for (let j = 0; j < 10; j++) { 
      let angle = radians(frameCount * 5);
      let radius = 50 + sin(frameCount * 0.1) * 30; 
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      let particle = new Particle(x, y);
      particles.push(particle);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0.01);
    this.lifespan = 200;
    this.size = random(15, 30);
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.rotationSpeed = random(-0.05, 0.05);
  }

  applyWind(wind) {

    this.acceleration.add(wind);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(2);
    this.position.add(this.velocity);
    this.lifespan -= 1; 
  }

  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    push();
    translate(this.position.x, this.position.y);
    rotate(frameCount * this.rotationSpeed);
    ellipse(0, 0, this.size, this.size);
    pop();
  }

  isOutOfBounds() {
    return (
      this.position.x < -width / 2 ||
      this.position.x > width / 2 ||
      this.position.y < -height / 2 ||
      this.position.y > height / 2
    );
  }
}
