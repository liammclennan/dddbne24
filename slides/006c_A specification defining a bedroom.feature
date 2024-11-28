Feature: Bedroom evaluation

Many jurisdictions define the properties that a room must have to be considered a bedroom in the context of real estate advertising. 

Scenario: Ceiling heights
Given I have a ceiling height of <CeilingHeightM>
When I check if the room is a bedroom
Then the room is a <Result>

Examples:
  | CeilingHeightM  | Result |
  | 2               | utility room|
  | 2.3             | utility room |
  | 2.4             | bedroom |
  | 2.5             | bedroom |
  | 4               | bedroom |

Scenario Outline: Windows too small
Given the length of the room is 5m
And the width of the room is 4m
And the window area is 1.9m2
When I check if the room is a bedroom
Then the room is a utility room

Scenario Outline: Windows minimum size
Given the length of the room is 5m
And the width of the room is 4m
And the window area is 2m2
When I check if the room is a bedroom
Then the room is a bedroom

Scenario Outline: Floor areas
Given the length of the room <RoomLengthM>
And the width of the room is <RoomWidthM>
When I check if the room is a bedroom
Then the room is a <Result>

Examples:
  | RoomLengthM | RoomWidthM  | Result |
  | 2           | 3           | utility room|
  | 3           | 3           | bedroom |
