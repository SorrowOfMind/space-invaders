const cvs = document.getElementById('gameboard');
const ctx = cvs.getContext('2d');

const width = ctx.canvas.width;
const height = ctx.canvas.height;

const BOX = 10;
const INVADERS = 100;
const COL = 20;
const OFFSET = 50;

const bg = new Image();
bg.src = './assets/bg.png';

let invaders = [];
let beams = [];
let recycledBeams = [];

class Invader {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.color = 'red';
        this.velX = 0;
        this.velY = 0;
        this.speed = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill()
    }

    move() {
        this.velX = this.speed;
        this.x += this.velX;
    }

    detectBorderCollision() {
        // if (this.x + this.r >= width) this.speed = -1;
        // if (this.x - this.r <= 0) this.speed = 1;
        if (this.x + this.r > width) return true;
        if (this.x - this.r < 0) return true;
        return false;
    }
}

const createInvaders = () => {
    for (let i = 0; i < INVADERS; i++) {
        let invader = new Invader((i % COL) * BOX * 2 + 60, Math.floor(i / COL) * BOX * 2 + 50, BOX * 0.5)
        invaders.push(invader);
    }
};

createInvaders();

class Beam {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = BOX * 2;
        this.height = BOX * 2;
        this.color = 'yellow';
        this.velY = 0;
        this.speed = 5;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.velY = this.speed;
        this.y -= this.velY;
    }

    detectBorderCollision() {
        if (this.y + this.width < 0) {
            beams = beams.filter(beam => !(beam.x === this.x && beam.y === this.y))
            recycledBeams.push(this);
        }
    }
}

class Player {
    constructor(x,y,w,h) {
        this.x = x,
        this.y = y,
        this.w = w,
        this.h = h,
        this.color = "green",
        this.velX = 0,
        this.speed = 5
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move() {
        if (controller.left) {
            this.velX = - this.speed;
            this.x += this.velX;
        }
        if (controller.right) {
            this.velX = this.speed;
            this.x += this.velX;
        }
    }

    borderCollision() {
        if (this.x <= 0) this.x = 0;
        if (this.x >= width - this.w) this.x = width - this.w;
    }

    shoot() {
        if (controller.shoot) {
            if (recycledBeams.length) {
                let newBeam = recycledBeams.shift();
                newBeam.x = this.x;
                newBeam.y = this.y;
                beams.push(newBeam);
            } else {
                let beam = new Beam(this.x, this.y);
                beams.push(beam);
            }
            controller.shoot = false;
        }
    }

}

let player = new Player(width*0.5 - BOX*2, height*0.9, BOX*2, BOX*4);

const controller = {
    right: false,
    left: false,
    shoot: false,

    checkKeys(e) {
        let state = e.type === 'keydown' ? true : false;
        let key = e.keyCode;
        switch(key) {
            case 37:
                controller.left = state;
                break;
            case 39:
                controller.right = state;
                break;
            case 32:
                controller.shoot = state;
        }
    }
}


let gameLoop = () => {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < invaders.length; i++) {
        invaders[i].draw();
        // invaders[i].move();
        if(invaders[i].detectBorderCollision()) {
            
            // console.log(invaders[0].x, invaders[20].x)
            // for (let j = 0; j < invaders.length; j++) {
            //     invaders[j].speed *= -1;
            // }
            invaders.forEach(inv => inv.speed *= -1);
        };

    }

    player.draw();
    player.move();
    player.borderCollision();
    player.shoot();

    if (beams.length) {
        for (let i = 0; i < beams.length; i++) {
            beams[i].draw();
            beams[i].move();
            beams[i].detectBorderCollision();
        }
    }

    window.requestAnimationFrame(gameLoop)
}




bg.addEventListener('load', function() {
    window.requestAnimationFrame(gameLoop);
});
window.addEventListener('keydown', controller.checkKeys);
window.addEventListener('keyup', controller.checkKeys);
