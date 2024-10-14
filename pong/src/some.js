"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Some = void 0;
var pong_mts_1 = require("./pong.mts");
var width = 600;
var height = 300;
var Some = /** @class */ (function () {
    function Some() {
    }
    Some.number = function () {
        return new Some();
    };
    Some.prototype.between = function (min, max) {
        this.min = min;
        this.max = max;
        return this;
    };
    Some.prototype.take = function (n) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gaussianRandom(this.min + (this.max - this.min) / 2, (this.max - this.min) / 10, this.min, this.max)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    Some.game = function (angleDegrees) {
        if (angleDegrees === void 0) { angleDegrees = null; }
        var pixelsPerTick = 5;
        var g = (0, pong_mts_1.begin)(width, height, pixelsPerTick);
        g.ball = new pong_mts_1.Ball(g.ball.position, pixelsPerTick, (0, pong_mts_1.a)(angleDegrees));
        return g;
    };
    return Some;
}());
exports.Some = Some;
function gaussianRandom(mean, stdev, min, max) {
    if (mean === void 0) { mean = 0; }
    if (stdev === void 0) { stdev = 1; }
    if (min === void 0) { min = -10; }
    if (max === void 0) { max = 10; }
    if (mean < min || mean > max) {
        throw new Error("min < mean < max");
    }
    var u = 1 - Math.random(); // Converting [0,1) to (0,1]
    var v = Math.random();
    var z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    // Transform to the desired mean and standard deviation:
    var g = z * stdev + mean;
    return (g < min || g > max)
        ? gaussianRandom(mean, stdev, min, max)
        : g;
}
