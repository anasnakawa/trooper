# trooper
simple commander.js bolierplate that helps run isolated experiments

# setup

after cloning this repo, install dependencies

```
npm install
```

run `first-time` command, to make `command.sh` executable

```
npm run first-time
```

# usage

1. deinfe your own `commander.js` commands in `index.js` or wherever you like
1. set experiment name inside `command.sh` using the `set` command
1. write the code that runs your commands in `command.sh` and execute them (e.g: `./command.sh`)
1. everytime you want to run a new experiment, rename the `set` command from `command.sh` file
1. all logs (using `logger` module), and files (using `file` module) were created by your commands will be stored in an isolated folder that has the same name as you have defined in the `set` command
