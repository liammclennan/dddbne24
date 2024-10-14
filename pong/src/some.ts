import {Game, PADDLE_HEIGHT, a, Angle, begin, Ball} from "./pong.mts";

const width = 600;
const height = 300;

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

    static game(angleDegrees: number = null): Game {
        const pixelsPerTick = 5;
        const g = begin(width, height, pixelsPerTick);
        if (angleDegrees !== null) {
            g.ball = new Ball(g.ball.position, pixelsPerTick,  a(angleDegrees));
        }
        return g;
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