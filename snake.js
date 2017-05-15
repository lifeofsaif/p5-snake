function snake(x, y, xspeed, yspeed, color) {
    this.location = createVector(x, y)
    this.speed = createVector(xspeed, yspeed)
    this.score = 0;
    this.a = new apple(2 * scl, 2 * scl)
    this.tLength = 0
    this.tail = []
    this.update = function () {
        this.location.x += this.speed.x
        this.location.y += this.speed.y
        this.location.x = constrain(this.location.x, 0, 600 - scl - 1)
        this.location.y = constrain(this.location.y, 0, 600 - scl - 1)
        if (this.getDistance() < 5) {
            this.createNewApple()
            this.extendTail()
        }
        for (var i = this.tail.length - 1; i > -1; i--) {
            this.tail[i].update()
            if (i == 0) {
                this.tail[i].updateLocation(this.location.x, this.location.y)
            }
            else {
                this.tail[i].updateLocation(this.tail[i-1].location.x, this.tail[i-1].location.y)
            }
            
        }
        fill(color)
        rect(this.location.x, this.location.y, scl, scl)
        this.a.show()
    }
    this.extendTail = function () {
        console.log('extending tail')
        this.tail.push(new tailUnit(this.location.x, this.location.y))
    }

    function tailUnit(x, y) {
        this.location = createVector(x, y)
        this.update = function () {
            fill('yellow')
            rect(this.location.x, this.location.y, scl, scl)
        }
        this.updateLocation = function (x,y) {
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
        this.a = new apple(Math.floor(random(600 / scl)) * scl, Math.floor(random(600 / scl)) * scl)
    }
    this.dir = function (keyCode) {
            if (keyCode === DOWN_ARROW) {
                this.speed.x = 0
                this.speed.y = scl
            }
            else if (keyCode === UP_ARROW) {
                this.speed.x = 0
                this.speed.y = -scl
            }
            else if (keyCode === LEFT_ARROW) {
                this.speed.x = -scl
                this.speed.y = 0
            }
            else if (keyCode === RIGHT_ARROW) {
                this.speed.x = scl
                this.speed.y = 0
            }
        }
        //apple construction 
    function apple(x, y) {
        //this.location = createVector(Math.floor(random(width / scl)) * scl, Math.floor(random(height / scl)) * scl)
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