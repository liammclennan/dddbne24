Pong is a simple tennis simulation game. This pong variant has a single player, controlling a paddle to hit the ball back at a wall. 

![A game of pong in progress](pong.jpg)

## Beginning

When the game begins:

* ::the ball starts in the center of the game area::{grep="the ball starts in the center of the game area"}
* ::the ball starts moving in a random direction::{grep="the ball does not always start in the same direction"}
* ::the ball moves according to Newton's 1st law  (An object ... remains in motion at a constant velocity unless acted on by a net external force)::{grep="ball obeys Newton's 1st law"}

## Collisions

### Wall Collisions

* ::When the ball hits the top, right, or bottom edge of the game area it bounces, with the angle of incidence equal to the angle of reflection.::{grep="ball bouncing top-bottom,ball bouncing right side"}

![Angle of reflection diagram](reflection.png)

### Paddle Collisions

* ::When the ball hits the paddle it bounces, with the angle of incidence equal to the angle of reflection.::{grep="when the ball hits the paddle it bounces"}

## Misses

* When the player misses the ball (the ball reaches the left edge of the game area without overlapping the paddle) ::
* the player's score decreases by 1::{grep="misses cost one point"}, and ::a new ball is started::{grep="after miss a new ball is started"}.  