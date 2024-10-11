"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_Y = exports.MAX_X = exports.PADDLE_HEIGHT = exports.BALL_SPEED = exports.pos = exports.a = void 0;
exports.tick = tick;
exports.begin = begin;
var a = function (n) {
    if (n < 0 || n > 360)
        throw new Error("0 <= Angle <= 360");
    return n;
};
exports.a = a;
var pos = function (n) {
    if (n < 0)
        throw new Error("0 <= PositiveNumber");
    return n;
};
exports.pos = pos;
exports.BALL_SPEED = (0, exports.pos)(10);
exports.PADDLE_HEIGHT = (0, exports.pos)(30);
exports.MAX_X = (0, exports.pos)(600);
exports.MAX_Y = (0, exports.pos)(300);
/**
 * Advances the state of the ball based on the game state.
 *
 * @param ball the current state of the ball
 * @returns the next state of the ball
 */
function tick(game) {
    // main behaviour is to move according to Newton's 1st law
    // if moving would escape min/max Y then bounce
    // if moving would escape min/max X then bounce if on a paddle, else 
    // modify score and restart
    game.ball = tickBall(game.ball);
    return game;
}
function tickBall(ball) {
    return {
        position: [
            (0, exports.pos)(Math.round(ball.position[0] + ball.vector.pixelsPerSecond * Math.cos(ball.vector.angleDegrees * Math.PI / 180))),
            (0, exports.pos)(Math.round(ball.position[1] + ball.vector.pixelsPerSecond * Math.sin(ball.vector.angleDegrees * Math.PI / 180))),
        ],
        vector: ball.vector,
    };
}
function begin() {
    return {
        ball: newBall(),
        leftPaddleY: (0, exports.pos)(exports.MAX_X / 2 - (exports.PADDLE_HEIGHT / 2)),
        rightPaddleY: (0, exports.pos)(exports.MAX_X / 2 - (exports.PADDLE_HEIGHT / 2)),
        leftScore: (0, exports.pos)(0),
        rightScore: (0, exports.pos)(0),
    };
}
function newBall() {
    return {
        position: [(0, exports.pos)(exports.MAX_X / 2), (0, exports.pos)(exports.MAX_Y / 2)],
        vector: {
            pixelsPerSecond: exports.BALL_SPEED,
            angleDegrees: (0, exports.a)(90), // todo randomize
        }
    };
}
