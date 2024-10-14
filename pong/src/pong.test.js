"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var node_assert_1 = require("node:assert");
var some_1 = require("./some");
(0, node_test_1.test)('the ball starts in the center of the game area', function (t) {
    var freshGame = some_1.Some.game();
    assertApproxEqual(freshGame.ball.position[0] * 2, freshGame.maxX);
    assertApproxEqual(freshGame.ball.position[1] * 2, freshGame.maxY);
});
(0, node_test_1.test)("the ball obeys Newton's 1st law", function (t) {
    for (var i = 0; i < 50; i++) {
        var angle = some_1.Some.number().between(1, 359).take(1).next().value;
        var game = some_1.Some.game(angle);
        var _a = [0, 0], previousDeltaX = _a[0], previousDeltaY = _a[1];
        for (var j = 0; i < 5; i++) {
            var _b = game.ball.position, ballX = _b[0], ballY = _b[1];
            game.tick();
            var _c = [game.ball.position[0] - ballX, game.ball.position[1] - ballY], deltaX = _c[0], deltaY = _c[1];
            // check that the ball is moving
            if (game.ball.vector.dx > 0) {
                node_assert_1.default.notEqual(deltaX, 0);
            }
            if (game.ball.vector.dy > 0) {
                node_assert_1.default.notEqual(deltaY, 0);
            }
            if (j > 0) {
                // check that the ball is moving in a constant direction
                node_assert_1.default.strictEqual(previousDeltaX, deltaX);
                node_assert_1.default.strictEqual(previousDeltaY, deltaY);
            }
            previousDeltaX = deltaX;
            previousDeltaY = deltaY;
        }
    }
});
(0, node_test_1.test)("the ball does not always start in the same direction", function (t) {
    var _a = [some_1.Some.game(), some_1.Some.game()], game1 = _a[0], game2 = _a[1];
    node_assert_1.default.notEqual([game1.ball.vector.dx, game1.ball.vector.dy], [game1.ball.vector.dx, game1.ball.vector.dy]);
});
node_test_1.test.skip('synchronous passing test', function (t) {
    // This test passes because it does not throw an exception.
    node_assert_1.default.strictEqual(1, 2);
});
function assertApproxEqual(a, b, message) {
    if (message === void 0) { message = null; }
    (0, node_assert_1.default)(Math.abs(a - b) < Math.max(a, b) / 100, message);
}
