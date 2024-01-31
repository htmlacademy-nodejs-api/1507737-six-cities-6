import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface.js';

export class CLIApp {
  private readonly defaultCommand = '--help';
  private commands: Record<string, Command> = {};

  public registerCommands(commandList: Command[]): void {
    this.commands = commandList.reduce((acc, v) => {
      const commandName = v.getName();

      if (this.commands[commandName]) {
        throw new Error(`Command ${commandName} is already registered`);
      }

      acc[commandName] = v;
      return acc;
    }, {} as Record<string, Command>);
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];

    command.execute(...commandArguments);
  }
}
