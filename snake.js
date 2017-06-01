function snake(x, y, xspeed, yspeed, color) {
    this.location = createVector(x, y)
    this.speed = createVector(xspeed, yspeed)
    this.score = 0;
    this.a = this.a = new apple(Math.floor(random(600 / scl)) * scl, Math.floor(random(600 / scl)) * scl)
    this.tLength = 0
    this.tail = []

    this.update = function () {
        this.location.x += this.speed.x
        this.location.y += this.speed.y
        this.location.x = constrain(this.location.x, 0, 600 - scl - 1)
        this.location.y = constrain(this.location.y, 0, 600 - scl - 1)
        for (var i = this.tail.length - 1; i > -1; i--) {
            if (dist(this.tail[i].location.x, this.tail[i].location.y, this.location.x, this.location.y) < 1) {
                if (loserSound) loserSound.play()
                if (localHighScore < allTimeHighScore) alert('LOSER')
                killSnake();

            }
            if (dist(this.tail[i].location.x, this.tail[i].location.y, this.a.location.x, this.a.location.y) < 1) this.createNewApple()
            this.tail[i].update()
            if (i == 0) {
                this.tail[i].updateLocation(this.location.x, this.location.y)
            } else {
                this.tail[i].updateLocation(this.tail[i - 1].location.x, this.tail[i - 1].location.y)
            }
        }
        if (this.getDistance() < 5) {
            this.createNewApple()
        }
        fill(color)
        rect(this.location.x, this.location.y, scl, scl)
        this.a.show()
    }
    this.extendTail = function () {
        if (this.tail.length == 2) {
            if (finishHimSound) {
                finishHimSound.play()
                coinSound.play()
                bgName = "kombat"
            }
        } else if (this.tail.length == 4) {
            if (shallNotPassSound) {
                shallNotPassSound.play()
                coinSound.play()
                bgName = "gandalf"
            }
            framecount += 4
            frameRate(framecount)
        } else if (this.tail.length == 6) {
            scare(); 
        } else {
            if (coinSound) {
                coinSound.play()
            }
        }


        this.tail.push(new tailUnit(this.location.x, this.location.y, getColor(this.tail.length)))
    }

    function tailUnit(x, y, color) {
        this.location = createVector(x, y)
        this.update = function () {
            fill(color)
            rect(this.location.x, this.location.y, scl, scl)
        }
        this.updateLocation = function (x, y) {
            this.location.x = x
            this.location.y = y
        }
        this.getLocation = function () {
            return {
                x: this.location.x,
                y: this.location.y
            }
        }
    }
    this.createNewApple = function () {
        if (framecount < 41) framecount += 2
        frameRate(framecount)
        this.a = new apple(Math.floor(random(600 / scl)) * scl, Math.floor(random(600 / scl)) * scl)
        this.extendTail()
        updateScore()

    }
    this.dir = function (keyCode) {
        if (keyCode === DOWN_ARROW) {
            this.speed.x = 0
            this.speed.y = scl
        } else if (keyCode === UP_ARROW) {
            this.speed.x = 0
            this.speed.y = -scl
        } else if (keyCode === LEFT_ARROW) {
            this.speed.x = -scl
            this.speed.y = 0
        } else if (keyCode === RIGHT_ARROW) {
            this.speed.x = scl
            this.speed.y = 0
        }
    }
    //apple construction 
    function apple(x, y) {
        this.location = createVector(x, y)
        this.show = function () {
            fill('red')
            rect(this.location.x, this.location.y, scl, scl)
        }
    }
    this.getDistance = function () {
        return dist(this.location.x, this.location.y, this.a.location.x, this.a.location.y)
    }
}
