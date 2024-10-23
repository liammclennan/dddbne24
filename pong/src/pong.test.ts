import {test} from "node:test";
import assert from "node:assert";
import {Some} from "./some";
import {Ball, Game} from "./pong.mts";

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

test.skip('synchronous passing test', (t) => {
    // This test passes because it does not throw an exception.
    assert.strictEqual(1, 2);
});

function assertApproxEqual(a: number, b: number, message = null) {
    assert(Math.abs(a-b) < Math.max(a,b) / 100, message);
}