const { Command } = require('commander');
const commands = require('./commands');

const program = new Command();

program
  .name('ninja-utility')
  .description('A command-line utility for various tasks')
  .version('1.0.0');

program
  .command('greet <name>')
  .description('Greet a user by name')
  .action(commands.greet.greet);

program
  .command('fetch <url>')
  .description('Fetch data from a URL')
  .action(commands.fetch.fetch);

program
  .command('read <file>')
  .description('Read a file')
  .action(commands.fetch.read);

program.parse(process.argv);