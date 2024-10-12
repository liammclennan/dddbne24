import {test} from "node:test";
import assert from "node:assert";
import {Some} from "./some";
import {a, Game} from "./pong";
import * as Pong from "./pong";

test('the ball starts in the center of the game area', (t) => {
    const freshGame = Pong.begin();
    assertApproxEqual(freshGame.ball.position[0] * 2, Pong.MAX_X);
    assertApproxEqual(freshGame.ball.position[1] * 2, Pong.MAX_Y);
});

test("the ball obeys Newton's 1st law", (t) => {
    for (var i = 0; i < 50; i++) {
        let angle = Some.number().between(1, 359).take(1).next().value;
        let game: Game = Some.game(a(angle));
        let [previousDeltaX, previousDeltaY] = [0,0];

        for (var j = 0; i < 5; i++) {
            let [ballX,ballY] = game.ball.position
            game = Pong.tick(game);

            let [deltaX, deltaY] = [game.ball.position[0] - ballX, game.ball.position[1] - ballY];

            // check that the ball is moving
            if (Math.abs((game.ball.vector.angleDegrees / 90) - Math.round(game.ball.vector.angleDegrees / 90)) > 0.05) {
                assert.notEqual(deltaX, 0);
                assert.notEqual(deltaY, 0);
            }

            if (j > 0) {
                // check that the ball is moving in a constant direction
                assert.strictEqual(previousDeltaX, deltaX);
                assert.strictEqual(previousDeltaY, deltaY);
            }
            previousDeltaX = deltaX;
            previousDeltaY = deltaY;
        }
    }
});

test("the ball does not always start in the same direction", (t) => {
    assert.notEqual(
        Pong.begin().ball.vector.angleDegrees,
        Pong.begin().ball.vector.angleDegrees
    );
});

test.skip('synchronous passing test', (t) => {
    // This test passes because it does not throw an exception.
    assert.strictEqual(1, 2);
});

function assertApproxEqual(a: number, b: number, message = null) {
    assert(Math.abs(a-b) < Math.max(a,b) / 100, message);
}