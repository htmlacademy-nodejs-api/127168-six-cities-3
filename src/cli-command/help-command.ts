import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

const chalkCommand = chalk.bold.bgWhite.blueBright;
const chalkDescription = chalk.italic;
const chalkTitle = chalk.bold;

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        ${chalkTitle('Программа для подготовки данных для REST API сервера.')}

        ${chalkTitle('Пример:')}

            ${chalkCommand('main.js --<command> [--arguments]')}

        ${chalkTitle('Команды:')}

            ${chalkCommand('--version ')} :                    ${chalkDescription('# выводит номер версии')}
            ${chalkCommand('--help ')} :                       ${chalkDescription('# печатает этот текст')}
            ${chalkCommand('--import <path> ')} :              ${chalkDescription('# импортирует данные из TSV')}
            ${chalkCommand('--generate <n> <path> <url> ')} :  ${chalkDescription('# генерирует произвольное количество тестовых данных')}
        `);
  }
}
