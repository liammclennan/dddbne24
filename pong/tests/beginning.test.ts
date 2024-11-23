import {test} from "node:test";
import assert from "node:assert";
import {Some} from "./some";
import {Ball, Game} from "../src/pong.mts";

test('the ball starts in the center of the game area', (t) => {
    const freshGame = Some.game();
    assertApproxEqual(freshGame.ball.position[0] * 2, freshGame.maxX);
    assertApproxEqual(freshGame.ball.position[1] * 2, freshGame.maxY);
});

test("the ball obeys Newton's 1st law", (t) => {
    for (var i = 0; i < 50; i++) {
        let angle = Some.number().between(1, 359).take(1).next().value;
        let game: Game = Some.game(angle);
        let [previousDeltaX, previousDeltaY] = [0,0];

        for (var j = 0; i < 5; i++) {
            let [ballX, ballY] = game.ball.position
            game.tick();

            let [deltaX, deltaY] = [game.ball.position[0] - ballX, game.ball.position[1] - ballY];

            // check that the ball is moving
            if (game.ball.vector.dx > 0) {
                assert.notEqual(deltaX, 0);
            }
            if (game.ball.vector.dy > 0) {
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
    let [game1,game2] = [Some.game(), Some.game()];
    assert.notDeepEqual(
        [game1.ball.vector.dx, game1.ball.vector.dy],
        [game2.ball.vector.dx, game2.ball.vector.dy],
    );
});

function assertApproxEqual(a: number, b: number, message = null) {
    assert(Math.abs(a-b) < Math.max(a,b) / 100, message);
}