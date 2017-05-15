var s
var scl = 20
var frame = 0
var originalframecount = 10
var framecount = originalframecount

function setup() {
    createCanvas(600, 600)
    s = new snake(300 - scl, 300 - scl, 0, 0, 'green')
    frameRate(framecount)

}

function getColor(length) {
    index = length % 11
    switch (index) {
        case 0:
            return '#00E517'
            break;
        case 1:
            return '#00E5A3'
            break;
        case 2:
            return '#0099E5'
            break;
        case 3:
            return '#000Ce5'
            break;
        case 4:
            return '#8000E5'
            break;
        case 5:
            return '#E500BC'
            break;
        case 6:
            return '#E50036'
            break;
        case 7:
            return '#E54F00'
            break;
        case 8:
            return '#E5D400'
            break;
        case 9:
            return '#6FE500'
            break;
        case 10:
            return '#00E516'
            break;

    }
    return 'black'
}

function draw() {

    background("#fffd91")
    if (s)
        s.update()

    stroke(getColor(frame))
    line(599, 0, 599, 599);
    line(0, 0, 0, 600)
    line(0, 0, 600, 0)
    line(0, 599, 599, 599)

    frame++
}

function mousePressed() {
    if (!s) {
        s = new snake(300 - scl, 300 - scl, 0, 0, 'green')

    }
}

function killSnake() {
    s = 0
    framecount = originalframecount
    frameRate(framecount)
}

function keyPressed() {
    if (s)
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
