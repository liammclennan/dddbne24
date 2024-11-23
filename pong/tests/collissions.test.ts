import {test} from "node:test";
import assert from "node:assert";
import {Ball, Game} from "../src/pong.mts";

test("ball bouncing top-bottom", (t) => {
    const ball = new Ball([100, 100], 10, 45);
    const [dx,dy] = [ball.vector.dx, ball.vector.dy];
    ball.bounceHorizontal();
    assert.strictEqual(ball.vector.dx, dx);
    assert.strictEqual(ball.vector.dy, dy * -1);
});

test("ball bouncing right side", (t) => {
    const ball = new Ball([100,100], 10, 45);
    const [dx,dy] = [ball.vector.dx, ball.vector.dy];
    ball.bounceVertical();
    assert.strictEqual(ball.vector.dx, dx * -1);
    assert.strictEqual(ball.vector.dy, dy);
});

test("when the ball hits the paddle it bounces", (t) => {
    const ball = new Ball([1,50], 10, 270);
    ball.tick(1000, 1000, [30,70]);
    assert(ball.vector.dx > 0);
});