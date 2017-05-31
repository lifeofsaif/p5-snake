var s
var scl = 20
var frame = 0
var originalframecount = 20
var framecount = originalframecount
var localHighScore = 0
var allTimeHighScore
var coinSound, loserSound, finishHimSound
var scared = false
var isChrome = !!window.chrome && !!window.chrome.webstore;

var bgName = 'standard'

/*
 * P5.js function that is only called once, prior to loading the setup 
 * This is used to load all these variables that may take a little bit longer to load
 * i am using it primarily to deal with loading sounds
 */
function preload() {
    alert("sounds working on only Chrome for now :(")
    
    if (isChrome) {
        coinSound = loadSound('./sounds/coinSound.mp3');
        loserSound = loadSound('./sounds/loserSound.mp3');
        finishHimSound = loadSound('./sounds/finishHimSound.mp3')
        shallNotPassSound = loadSound('./sounds/shallNotPassSound.mp3')
        spookySound = loadSound('./sounds/spooky.mp3')
    }
}


/*
 * P5.js function that is only called once, prior to loading the setup 
 * This is used to load all these variables that may take a little bit longer to load
 * i am using it primarily to deal with loading sounds
 */
function setup() {
    canvas = createCanvas(600, 600)
    canvas.parent('canvasContainer')
    s = new snake(300 - scl, 300 - scl, 0, 0, 'green')
    frameRate(framecount)
}

/* 
 *  function to get the color of the tail based on the length pf the tail 
 *  creates a rainbow effect 
 * 
 */
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
    if(!scared)
    if (!s) {
        background("#fffd91")
        if (localHighScore > allTimeHighScore) {
            allTimeHighScore = localHighScore
            $("#allTimeHighScore").html(allTimeHighScore)
            var message = prompt("You are the winner!!");
            updateAllTimeHighScore(message, allTimeHighScore)
        }
        createNewSnake()
    } else {
        
        if (bgName == 'gandalf') {
            stroke('white')
            background('black')
            for (var i = 0; i < 1025; i++) {
                line(300, 300, random(600), random(600))
            }
        } else if (bgName == 'kombat') {
            stroke('white')
            background('black')
            for (var i = 0; i < 2050; i++) {
                point(random(600), random(600))
            }
        } else {
            //background("#fffd91")
            background("#191919")
            
            
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


function scare(){
    if(isChrome)
        spookySound.play();
    killSnake();
    //play soundbyte
    $("body").html("<img id='spooky' src='./scaryFace.jpg'></img>")
    
    $("#spooky").css( "width", $(window).width() );
    $("#spooky").css( "height", $(window).height() );
    scared = true; 
}

function createNewSnake() {
    if (!s) {
        s = new snake(300 - scl, 300 - scl, 0, 0, 'green')
        updateScore()
    }
}

function killSnake() {
    s = 0
    framecount = originalframecount
    frameRate(framecount)
    bgName = "standard"
}

function keyPressed() {
    if(keyCode==68)
        scare();
    
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
