import {pos, Game, MAX_X, MAX_Y, BALL_SPEED, PADDLE_HEIGHT, a, Angle} from "./pong";

export class Some {
    min: number;
    max: number;

    static number() {
        return new Some();
    }

    public between(min: number, max: number) {
        this.min = min;
        this.max = max;
        return this;
    }

    * take(n: number) {
        yield gaussianRandom(this.min + (this.max - this.min) / 2, (this.max - this.min) / 10, this.min, this.max);
    }

    static game(angleDegrees: Angle): Game {
        return {
            ball: {
                position: [pos(MAX_X / 2), pos(MAX_Y / 2)],
                vector: {
                    pixelsPerSecond: BALL_SPEED,
                    angleDegrees,
                }
            },
            leftPaddleY: pos(MAX_X / 2 - (PADDLE_HEIGHT / 2)),
            rightPaddleY: pos(MAX_X / 2 - (PADDLE_HEIGHT / 2)),
            leftScore: pos(0),
            rightScore: pos(0),
        };
    }
}

function gaussianRandom(mean=0, stdev=1, min = -10, max = 10) {
    if (mean < min || mean > max) {
        throw new Error(`min < mean < max`);
    }
    const u = 1 - Math.random(); // Converting [0,1) to (0,1]
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    const g = z * stdev + mean;
    return (g < min || g > max)
        ? gaussianRandom(mean, stdev, min, max)
        : g;
}