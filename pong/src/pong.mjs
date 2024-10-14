export var a = function (n) {
    if (n < 0 || n > 360)
        throw new Error("0 <= Angle <= 360");
    return n;
};
export var pos = function (n) {
    if (n < 0)
        throw new Error("0 <= PositiveNumber");
    return n;
};
export var PADDLE_HEIGHT = pos(60);
var Ball = /** @class */ (function () {
    function Ball(position, pixelsPerTick, angle) {
        console.log(angle);
        this.position = position;
        this.vector = {
            pixelsPerTick: pixelsPerTick,
            dx: pixelsPerTick * Math.sin(angle * (Math.PI / 180)),
            dy: pixelsPerTick * Math.cos(angle * (Math.PI / 180)),
        };
    }
    Ball.prototype.tick = function (maxX, maxY) {
        var _a = [
            Math.round(this.position[0] + this.vector.dx),
            Math.round(this.position[1] + this.vector.dy)
        ], candidateX = _a[0], candidateY = _a[1];
        if (candidateX > maxX || candidateX < 0) {
            this.bounceVertical();
            return;
        }
        if (candidateY > maxY || candidateY < 0) {
            this.bounceHorizontal();
            return;
        }
        this.position[0] = candidateX;
        this.position[1] = candidateY;
    };
    Ball.prototype.bounceVertical = function () {
        this.vector.dx *= -1;
    };
    Ball.prototype.bounceHorizontal = function () {
        this.vector.dy *= -1;
    };
    return Ball;
}());
export { Ball };
var Game = /** @class */ (function () {
    function Game(maxX, maxY, ballPixelsPerTick) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.ball = this.newBall(ballPixelsPerTick);
        this.paddleY = pos(maxY / 2 - (PADDLE_HEIGHT / 2));
    }
    Game.prototype.up = function () {
        this.paddleY = pos(Math.max(this.paddleY - 25, 15));
    };
    Game.prototype.down = function () {
        this.paddleY = pos(Math.min(this.paddleY + 25, 255));
    };
    /**
     * Advances the state of the ball based on the game state.
     *
     * @param ball the current state of the ball
     * @returns the next state of the ball
     */
    Game.prototype.tick = function () {
        // main behaviour is to move according to Newton's 1st law
        // if moving would escape min/max Y then bounce
        // if moving would escape min/max X then bounce if on a paddle, else
        // modify score and restart
        this.ball.tick(this.maxX, this.maxY);
        return this;
    };
    Game.prototype.newBall = function (pixelsPerTick) {
        return new Ball([pos(this.maxX / 2), pos(this.maxY / 2)], pixelsPerTick, a(Math.random() * 80 + 220));
    };
    return Game;
}());
export { Game };
export function begin(maxX, maxY, ballPixelsPerTick) {
    return new Game(pos(maxX), pos(maxY), ballPixelsPerTick);
}
