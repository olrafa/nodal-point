# Tennis simulator

## About

A tennis game simulator to run from the terminal, where users only watch the outcome of each point. The idea is vaguely inspired by the vintage football game [Elifoot](https://www.elifoot.com/site/).

The name and ranking of players are hardcoded, based on WTA Rankings as of April 24th, 2023. We pick any random two out of the top 16 to play.

## Run the project

There is no production build or anything like that. It's just set for a local development environment. So, you need to have Node installed.

Then, run:

```bash
git clone git@github.com:olrafa/tennis-simulator.git
cd tennis-simulator
npm install
```

Start a match with `npm start`. The process will finish when the match is over.

TODOs:

- [ ] Improve looks on scoreboard
- [ ] Add a preview to this README
- [ ] Feature: create next match after first is finished, until a whole tournament is played

## License

[Unlicense](https://unlicense.org)
