# Open Issues

## Currently working


## Todo

- Make firing on empty tiles destroy resources, etc.
- Limit number of marked targets based on resources; make firing cost resources
- Move player to adjacent tile before exploring a new tile
- If in targeting mode, still allow player to move to explored/empty tiles. This
may involve editing the state machine so that once a tile is explored it is
guaranteed to have nothing else of interest in it.
- Apply gradient to battle text, or other method of showing bottom-to-top output
- Add a bunch more variety to battle text
- Improve battle intro animations (sliding panels)
- Add enemy and player attack animations, flying damage numbers
- Add additional enemy behavior
- Tune difficulty and combat numbers to account for map layer and resource pickup

## Bugs

- Combat text is cut off at the bottom for lines that almost fit when font size
is 60.