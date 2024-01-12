import { Command } from './command.js';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  execute(..._parameters: string[]): void {
    console.info(`
    Программа для подготовки данных для REST API сервера.
    Пример:
        cli.js --<command> [--arguments]
    Команды:
        --version:                   # выводит номер версии
        --help:                      # печатает этот текст
        --import <path>:             # импортирует данные из TSV
`);
  }
}
