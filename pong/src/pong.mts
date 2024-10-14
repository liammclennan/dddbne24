export type Angle = number & { readonly __tag: unique symbol };
export const a = (n: number): Angle => {
    if (n < 0 || n > 360) throw new Error("0 <= Angle <= 360");
    return n as Angle;
}

export type PositiveNumber = number & { readonly __tag: unique symbol };
export const pos = (n: number): PositiveNumber => {
    if (n < 0) throw new Error("0 <= PositiveNumber");
    return n as PositiveNumber;
};

export const PADDLE_HEIGHT = pos(60);

export type Vector = {
    pixelsPerTick: number,
    dx: number,
    dy: number,
};

export class Ball {
    position: [number, number];
    vector: Vector;

    constructor(position: [PositiveNumber, PositiveNumber], pixelsPerTick: number, angle: Angle) {
        console.log(angle);
        this.position = position;
        this.vector = {
            pixelsPerTick,
            dx: pixelsPerTick * Math.sin(angle * (Math.PI / 180)),
            dy: pixelsPerTick * Math.cos(angle * (Math.PI / 180)),
        };
    }

    tick(maxX: PositiveNumber, maxY: PositiveNumber) {
        let [candidateX, candidateY] = [
            Math.round(this.position[0] + this.vector.dx),
            Math.round(this.position[1] + this.vector.dy)
        ];

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
    }

    bounceVertical() {
        this.vector.dx *= -1;
    }

    bounceHorizontal() {
        this.vector.dy *= -1;
    }
}

export class Game {
    maxX: PositiveNumber;
    maxY: PositiveNumber;

    ball: Ball;

    paddleY: PositiveNumber;

    constructor(maxX: PositiveNumber, maxY: PositiveNumber, ballPixelsPerTick: number) {
        this.maxX = maxX;
        this.maxY = maxY;

        this.ball = this.newBall(ballPixelsPerTick);
        this.paddleY = pos(maxY / 2 - (PADDLE_HEIGHT / 2));
    }

    up() {
        this.paddleY = pos(Math.max(this.paddleY - 25, 15));
    }

    down() {
        this.paddleY = pos(Math.min(this.paddleY + 25, 255));
    }

    /**
     * Advances the state of the ball based on the game state.
     *
     * @param ball the current state of the ball
     * @returns the next state of the ball
     */
    tick() {
        // main behaviour is to move according to Newton's 1st law

        // if moving would escape min/max Y then bounce

        // if moving would escape min/max X then bounce if on a paddle, else
        // modify score and restart
        this.ball.tick(this.maxX, this.maxY);
        return this;
    }

    newBall(pixelsPerTick: number): Ball {
        return new Ball(
            [pos(this.maxX / 2), pos(this.maxY / 2)],
                    pixelsPerTick,
                    a(Math.random() * 80 + 220),
        );
    }
}

export function begin(maxX: number, maxY: number, ballPixelsPerTick: number): Game {
    return new Game(pos(maxX), pos(maxY), ballPixelsPerTick);
}



