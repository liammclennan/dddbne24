import {pos, Game, MAX_X, MAX_Y, BALL_SPEED, PADDLE_HEIGHT, angle, Angle} from "./pong";

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
        yield 0;
    }

    static game(angleDegrees: Angle): Game {
        return {
            ball: {
                position: [pos(MAX_X / 2), pos(MAX_Y / 2)],
                vector: {
                    speed: BALL_SPEED,
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