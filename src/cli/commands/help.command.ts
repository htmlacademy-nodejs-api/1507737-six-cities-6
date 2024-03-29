import c from 'chalk';
import { injectable } from 'inversify';

import { Command } from './command.interface.js';

@injectable()
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
        ${c.blueBright('--version:')}                   # Вывести номер текущей версии приложения
        ${c.blueBright('--help:')}                      # Показать справку по использованию программы
        ${c.blueBright('--import <path>:')}             # Импортировать данные из файла формата .tsv
        ${c.blueBright('--generate <n> <path> <url>:')} # генерирует произвольное количество тестовых данных
`);
  }
}
