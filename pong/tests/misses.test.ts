import {test} from "node:test";
import assert from "node:assert";
import {Ball, Game} from "../src/pong.mts";

test("misses cost one point", (t) => {
    let game = new Game(1000, 1000, 10);
    const ball = new Ball([1, 5], 10, 270);
    game.ball = ball;
    game = game.tick();
    assert.strictEqual(game.score, -1);
});

test("after miss a new ball is started", (t) => {
    let game = new Game(1000, 1000, 10);
    const ball = new Ball([1, 5], 10, 270);
    game.ball = ball;
    game = game.tick();
    assert(game.ball != ball);
});
