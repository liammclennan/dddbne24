import {test} from "node:test";
import assert from "node:assert";
import {Some} from "./some";
import {a, Game} from "./pong";
import * as Pong from "./pong";

test("ball obeys Newton's 1st law", (t) => {
    for (var i = 0; i < 10; i++) {
        let angle = Some.number().between(1, 359).take(1).next().value;
        if (angle > 178 && angle < 182) {
            angle = Some.number().between(1, 359).take(1).next().value;
        }
        console.log(angle);
        let game: Game = Some.game(a(angle));
        let [previousDeltaX, previousDeltaY] = [0,0];

        for (var i = 0; i < 10; i++) {
            let [ballX,ballY] = game.ball.position
            game = Pong.tick(game);

            let [deltaX, deltaY] = [game.ball.position[0] - ballX, game.ball.position[1] - ballY];

            // check that the ball is moving
            assert.notEqual(deltaX, 0);
            assert.notEqual(deltaY, 0);

            if (i > 0) {
                // check that the ball is moving in a constant direction
                assert.strictEqual(previousDeltaX, deltaX);
                assert.strictEqual(previousDeltaY, deltaY);
            }
            previousDeltaX = deltaX;
            previousDeltaY = deltaY;
        }
    }
});

test.skip('synchronous passing test', (t) => {
    // This test passes because it does not throw an exception.
    assert.strictEqual(1, 2);
});