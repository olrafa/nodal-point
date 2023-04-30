# Tennis simulator

This was my first attempt at programming at all back in 2019, the language of choice then was Python 3. In 2023 I'm moving it to Node + TypeScript, just for fun.

It's a kind of tennis game simulator to run from the terminal, but users only watch the outcome of each point.

The idea is inspired in the vintage football game Elifoot.

The name and ranking of players are hard coded, based on WTA Rankings as of April 24th, 2023. We pick any random two out of the top 16 to play.

## Run the project

The is no production build or anything like that. It's just set for a local development environment. So, you need to have Node installed.

Then, run:

```
git clone git@github.com:olrafa/tennis-simulator.git
cd tennis-simulator
npm install
```

Start a game with `npm run start:dev`. Which is actually run the project on Nodemon.

TODOs:
- [ ] Fix bug with display of finished match
- [ ] Improve looks on scoreboard
- [ ] Add a preview to this README
- [ ] Set up pre-commit hook for autofixes
- [ ] Feature: create next match after first is finished, until a whole tournament is played
