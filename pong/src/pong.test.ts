import {test} from "node:test";
import assert from "node:assert";
import {Some} from "./some";
import * as Pong from "./pong";

test("ball obeys Newton's 1st law", (t) => {
    for (var i = 0; i < 100; i++) {
        let angle = Some.number().between(0, 361).take(1).next();
        let game: Pong.Game = Some.game(Pong.angle(angle));
    }
});

test('synchronous passing test', (t) => {
    // This test passes because it does not throw an exception.
    assert.strictEqual(1, 2);
});