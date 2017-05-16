var s
var scl = 20
var frame = 0
var originalframecount = 20
var framecount = originalframecount
var localHighScore = 0
var allTimeHighScore

function setup() {
    canvas = createCanvas(600, 600)
    canvas.parent('canvasContainer')
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
    if (!s) {
        background("#fffd91")
        if (localHighScore > allTimeHighScore) {
            allTimeHighScore = localHighScore
            $("#allTimeHighScore").html(allTimeHighScore)
            var message = prompt("You are the winner!!");
            updateAllTimeHighScore(message, allTimeHighScore)
        } else {
            alert("LOSER")
        }
        
        createNewSnake()
    }
    else {
        if (framecount > 40) {
            stroke('white')
            background('black')
            for (var i = 0; i < 2050; i++) {
                point(random(600), random(600))
            }
        }
        else {
            background("#fffd91")
        }
        stroke(getColor(frame))
        line(599, 0, 599, 599);
        line(0, 0, 0, 600)
        line(0, 0, 600, 0)
        line(0, 599, 599, 599)
        if (s) s.update()
        frame++
    }
}

function mousePressed() {
    createNewSnake()
}

function createNewSnake() {
    if (!s) {
        s = new snake(300 - scl, 300 - scl, 0, 0, 'green')
        updateScore()
    }
}

function killSnake() {
    //return
    s = 0
    framecount = originalframecount
    frameRate(framecount)
}

function keyPressed() {
    if (s) s.dir(keyCode)
}

function apple() {
    //this.location = createVector(Math.floor(random(width / scl)) * scl, Math.floor(random(height / scl)) * scl)
    this.location = createVector(2 * scl, 0 * scl)
    this.show = function () {
        fill('red')
        rect(this.location.x, this.location.y, scl, scl)
    }
}

function updateScore() {
    $("#scoreNumber").html(s.tail.length)
    if (s.tail.length > localHighScore) {
        localHighScore = s.tail.length
        $("#localHighScore").html(s.tail.length)
    }
}