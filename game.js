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
        this.r = 0
    }
}

class Player {
    constructor(x,y,w,h) {
        this.x = x,
        this.y = y,
        this.w = w,
        this.h = h,
        this.color = "green"
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h)
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

const createInvaders = () => {
    for(let i = 0; i < 20; i++) {

    }
}


bg.addEventListener('load', function() {
    ctx.drawImage(this, 0, 0);
})

let gameLoop = () => {
    player.draw();

    window.requestAnimationFrame(gameLoop)
}


window.addEventListener('keydown', controller.checkKeys);
window.addEventListener('keyup', controller.checkKeys);
window.requestAnimationFrame(gameLoop);