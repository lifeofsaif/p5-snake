var s
var scl = 20


function setup() {
    createCanvas(600, 600)
    s = new snake(scl, scl, 0, 0, 'green')
    frameRate(20)
}

function draw() {
    background(167, 183, 165)
    s.update()
}

function keyPressed() {
    s.dir(keyCode)
}

function apple() {
    //this.location = createVector(Math.floor(random(width / scl)) * scl, Math.floor(random(height / scl)) * scl)
    this.location = createVector(2 * scl, 0 * scl)
    this.show = function () {
        fill('red')
        rect(this.location.x, this.location.y, scl, scl)
    }
}
