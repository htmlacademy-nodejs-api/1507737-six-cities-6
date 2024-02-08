import { CLIApp } from './cli-app.js';
import { getCommandsWithContainer } from './get-commands-with-container.js';

export function run() {
  const cli = new CLIApp();

  const commands = getCommandsWithContainer();

  cli.registerCommands(commands);
  cli.processCommand(process.argv);
}

