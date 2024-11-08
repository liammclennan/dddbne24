export var PADDLE_HEIGHT = 60;
var Ball = /** @class */ (function () {
    function Ball(position, pixelsPerTick, angle) {
        this.position = position;
        this.vector = {
            pixelsPerTick: pixelsPerTick,
            dx: pixelsPerTick * Math.sin(angle * (Math.PI / 180)),
            dy: pixelsPerTick * Math.cos(angle * (Math.PI / 180)),
        };
    }
    Ball.prototype.tick = function (maxX, maxY, paddleRange) {
        var _a = [
            Math.round(this.position[0] + this.vector.dx),
            Math.round(this.position[1] + this.vector.dy)
        ], candidateX = _a[0], candidateY = _a[1];
        if (candidateX > (maxX - 30)) {
            this.bounceVertical();
            return;
        }
        if (candidateY > (maxY - 30) || candidateY < 0) {
            this.bounceHorizontal();
            return;
        }
        // a hit!
        if (candidateX < 0 && candidateY > paddleRange[0] && candidateY < paddleRange[1]) {
            this.bounceVertical();
            var paddle_span = paddleRange[1] - paddleRange[0];
            var sweet_spot = [paddleRange[0] + paddle_span * 0.2, paddleRange[1] - paddle_span * 0.2];
            if (candidateY > sweet_spot[0] && candidateY < sweet_spot[1]) {
                this.vector.dx = this.vector.dx * 1.1;
            }
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
    Ball.prototype.faster = function () {
        this.vector.dx = this.vector.dx * 1.005;
        this.vector.dy = this.vector.dy * 1.005;
    };
    return Ball;
}());
export { Ball };
var Game = /** @class */ (function () {
    function Game(maxX, maxY, ballPixelsPerTick) {
        this.score = 0;
        this.ticks = 0;
        this.maxX = maxX;
        this.maxY = maxY;
        this.ball = this.newBall(ballPixelsPerTick);
        this.paddleY = maxY / 2 - (PADDLE_HEIGHT / 2);
    }
    Game.prototype.up = function () {
        this.paddleY = Math.max(this.paddleY - 30, 0);
    };
    Game.prototype.down = function () {
        this.paddleY = Math.min(this.paddleY + 30, 240);
    };
    /**
     * Advances the state of the ball based on the game state.
     *
     * @param ball the current state of the ball
     * @returns the next state of the ball
     */
    Game.prototype.tick = function () {
        this.ticks += 1;
        this.ball.tick(this.maxX, this.maxY, [this.paddleY - 5, this.paddleY + PADDLE_HEIGHT + 5]);
        if (this.ticks % 50 === 0) {
            this.ball.faster();
        }
        // missed
        if (this.ball.position[0] < 0) {
            this.score -= 1;
            this.ball = this.newBall(this.ball.vector.pixelsPerTick);
        }
        return this;
    };
    Game.prototype.newBall = function (pixelsPerTick) {
        return new Ball([this.maxX / 2, this.maxY / 2], pixelsPerTick, Math.random() * 80 + 220);
    };
    return Game;
}());
export { Game };
export function begin(maxX, maxY, ballPixelsPerTick) {
    return new Game(maxX, maxY, ballPixelsPerTick);
}
