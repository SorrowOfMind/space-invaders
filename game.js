const cvs = document.getElementById('gameboard');
const ctx = cvs.getContext('2d');

const width = ctx.canvas.width;
const height = ctx.canvas.height;

class Invader {
    constructor(x, y) {
        this.x = x,
        this.y = y,
        this.r = 0
    }
}