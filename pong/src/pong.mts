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

    tick(maxX: PositiveNumber, maxY: PositiveNumber, paddleRange: [number, number]) {
        let [candidateX, candidateY] = [
            Math.round(this.position[0] + this.vector.dx),
            Math.round(this.position[1] + this.vector.dy)
        ];

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

            const paddle_span = paddleRange[1] - paddleRange[0];
            const sweet_spot = [paddleRange[0] + paddle_span * 0.2, paddleRange[1] -  paddle_span * 0.2];

            if (candidateY > sweet_spot[0] && candidateY < sweet_spot[1]) {
                this.vector.dx = this.vector.dx * 1.1;
            }
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

    faster() {
        this.vector.dx = this.vector.dx * 1.005;
        this.vector.dy = this.vector.dy * 1.005;
    }
}

export class Game {
    maxX: PositiveNumber;
    maxY: PositiveNumber;
    score: number = 0;
    ticks: number = 0;

    ball: Ball;

    paddleY: PositiveNumber;

    constructor(maxX: PositiveNumber, maxY: PositiveNumber, ballPixelsPerTick: number) {
        this.maxX = maxX;
        this.maxY = maxY;

        this.ball = this.newBall(ballPixelsPerTick);
        this.paddleY = pos(maxY / 2 - (PADDLE_HEIGHT / 2));
    }

    up() {
        this.paddleY = pos(Math.max(this.paddleY - 30, 0));
    }

    down() {
        this.paddleY = pos(Math.min(this.paddleY + 30, 240));
    }

    /**
     * Advances the state of the ball based on the game state.
     *
     * @param ball the current state of the ball
     * @returns the next state of the ball
     */
    tick() {
        this.ticks += 1;
        this.ball.tick(this.maxX, this.maxY, [this.paddleY-5, this.paddleY + PADDLE_HEIGHT+5]);

        if (this.ticks % 50 === 0) {
            this.ball.faster();
        }

        // missed
        if (this.ball.position[0] < 0) {
            this.score -= 1;
            this.ball = this.newBall(this.ball.vector.pixelsPerTick);
        }
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



