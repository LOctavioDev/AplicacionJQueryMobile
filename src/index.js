import chalk from 'chalk';
import app from './app.js';
import database from './database.js';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(chalk.blue(`====================\nSERVER ON PORT: ${chalk.yellow(port)}\n====================`));
});
