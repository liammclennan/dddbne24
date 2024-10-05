type Angle = number & { readonly __tag: unique symbol };
const makeAngle = (n: number): Angle => {
    if (n < 0 || n > 360) throw new Error("0 <= Angle <= 360");
    return n as Angle;
}

type PositiveNumber = number & { readonly __tag: unique symbol };
const makePositiveNumber = (n: number): PositiveNumber => {
    if (n < 0) throw new Error("0 <= PositiveNumber");
    return n as PositiveNumber;
};

const BALL_SPEED = makePositiveNumber(10);
const PADDLE_HEIGHT = makePositiveNumber(30);
const MAX_X = makePositiveNumber(600);
const MAX_Y =  makePositiveNumber(300);

type Vector = {
    speed: PositiveNumber,
    angleDegrees: Angle,
};

type Ball = {
    position: [PositiveNumber, PositiveNumber],
    vector: Vector,
}

type Game = {    
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
        leftPaddleY: makePositiveNumber(MAX_X / 2 - (PADDLE_HEIGHT / 2)),
        rightPaddleY: makePositiveNumber(MAX_X / 2 - (PADDLE_HEIGHT / 2)),
        leftScore: makePositiveNumber(0),
        rightScore: makePositiveNumber(0),
    };
}

function newBall(): Ball {
    return {
        position: [makePositiveNumber(MAX_X / 2), makePositiveNumber(MAX_Y / 2)],
        vector: {
            speed: BALL_SPEED,
            angleDegrees: makeAngle(90), // todo randomize
        }
    };
}

