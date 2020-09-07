const cvs = document.getElementById('gameboard');
const ctx = cvs.getContext('2d');

const width = ctx.canvas.width;
const height = ctx.canvas.height;

const BOX = 10;

const bg = new Image();
bg.src = './assets/bg.png';


class Invader {
    constructor(x, y) {
        this.x = x,
        this.y = y,
        this.r = 0,
        this.color = 'red'
    }
}

const drawInvaders = () => {
    ctx.fillStyle = 'red';
        for (let i = 0; i < 100; i++) {
            ctx.beginPath();
            ctx.arc((i % 20) * BOX*2 + 50, Math.floor(i / 20) * BOX*2 + 50, BOX, 0, 2 * Math.PI);
            ctx.fill();
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
}

let player = new Player(width*0.5 - BOX*2, height*0.9, BOX*2, BOX*4);

const controller = {
    right: false,
    left: false,

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
        }
    }
}


let gameLoop = () => {
    ctx.drawImage(bg, 0, 0);
    player.draw();
    player.move();
    player.borderCollision();
    drawInvaders();


    window.requestAnimationFrame(gameLoop)
}

bg.addEventListener('load', function() {
    window.requestAnimationFrame(gameLoop);
});

window.addEventListener('keydown', controller.checkKeys);
window.addEventListener('keyup', controller.checkKeys);
