import { React, ReactDOM, html } from "./deps.js";
import * as Pong from "/pong.mjs";

const BALL_PIXELS_PER_SECOND = 200;
const REFRESH_RATE = 60;

let game = Pong.begin(800, 300, BALL_PIXELS_PER_SECOND / REFRESH_RATE);

const Paddle = (props) => {
    const l = props.side == "left" ? 0 : 792;
    const style = {
        left: l,
        top: props.offset
    };
    return html`<div className="paddle" style=${style}></div>`;
}

const Ball = (props) => {
    return html`<div className="ball" style="${{
        top: props.ball.position[1], 
        left: props.ball.position[0]
    }}"></div>`;
};

const App = (props) => {
    return html`<div>
        <div className="net"/>
        <${Ball} ball=${props.game.ball} />
        <${Paddle} side=${"left"} offset=${props.game.paddleY}/>
    </div>`;
}

Mousetrap.bind('up', function() {
    game.up();
    render(game);
});

Mousetrap.bind('down', function() {
    game.down();
    render(game);
});

function render(game) {
    ReactDOM.render(
        html`<${App} game=${game} />`,
        document.getElementById("root")
    );
}



setInterval(() => {
    game = game.tick();
    render(game);
}, 1000 / REFRESH_RATE);

