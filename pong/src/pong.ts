export type Angle = number & { readonly __tag: unique symbol };
export const angle = (n: number): Angle => {
    if (n < 0 || n > 360) throw new Error("0 <= Angle <= 360");
    return n as Angle;
}

type PositiveNumber = number & { readonly __tag: unique symbol };
export const pos = (n: number): PositiveNumber => {
    if (n < 0) throw new Error("0 <= PositiveNumber");
    return n as PositiveNumber;
};

export const BALL_SPEED = pos(10);
export const PADDLE_HEIGHT = pos(30);
export const MAX_X = pos(600);
export const MAX_Y =  pos(300);

export type Vector = {
    speed: PositiveNumber,
    angleDegrees: Angle,
};

export type Ball = {
    position: [PositiveNumber, PositiveNumber],
    vector: Vector,
}

export type Game = {    
    ball: Ball,
    
    leftPaddleY: PositiveNumber,
    rightPaddleY: PositiveNumber,

    leftScore: PositiveNumber,
    rightScore: PositiveNumber,
}

/**
 * Advances the state of the ball based on the game state.
 * 
 * @param ball the current state of the ball
 * @returns the next state of the ball
 */
export function tick(game: Game): Game {
    // main behaviour is to move according to Newton's 1st law

    // if moving would escape min/max Y then bounce

    // if moving would escape min/max X then bounce if on a paddle, else 
    // modify score and restart
    return game;
}

export function begin(): Game {
    return {
        ball: newBall(),
        leftPaddleY: pos(MAX_X / 2 - (PADDLE_HEIGHT / 2)),
        rightPaddleY: pos(MAX_X / 2 - (PADDLE_HEIGHT / 2)),
        leftScore: pos(0),
        rightScore: pos(0),
    };
}

function newBall(): Ball {
    return {
        position: [pos(MAX_X / 2), pos(MAX_Y / 2)],
        vector: {
            speed: BALL_SPEED,
            angleDegrees: angle(90), // todo randomize
        }
    };
}

