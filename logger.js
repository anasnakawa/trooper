import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import stripAnsi from 'strip-ansi'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), path.basename(__filename));

const levels = {
    log: 'INFO',
    info: 'INFO',
    warn: 'WARN',
    error: 'ERROR',
    success: 'SUCCESS'
};

let ENV = '';

const logToFile = true;  // Set to true if you want to write logs to a file
const logFilePath = path.join(__dirname, 'app.log');

function formatDate(date) {
    return date.toISOString();
}

function log(level, message, data = null) {
    const timestamp = formatDate(new Date());
    const chalk_map = {
        'INFO': chalk.blue,
        'WARN': chalk.yellow,
        'ERROR': chalk.red,
        'SUCCESS': chalk.green
    }
    const chalk_method = chalk_map[level];
    const logMessage = `[${chalk.gray(timestamp)}] [${chalk_method(level)}] ${message} ${data ? data : ''}`;

    // Output to console
    if (level === levels.error) {
        console.error(logMessage);
    } else {
        console.log(logMessage);
    }

    // Optionally write logs to a file
    if (logToFile) {
        const timestamp = new Date().toISOString().split('T')[0]; // Example timestamp format
        const logDirPath = path.join(__dirname, '..', 'data', `${ENV}`);
        const datedLogFilePath = path.join(logDirPath, `app-${timestamp}.log`);

        // Ensure the directory exists
        if (!fs.existsSync(logDirPath)) {
            fs.mkdirSync(logDirPath, { recursive: true });
        }

        const cleanMessage = stripAnsi(logMessage); // Strip chalk colors
        const logsToWrite = cleanMessage + '\n';
        fs.appendFileSync(datedLogFilePath, logsToWrite, { encoding: 'utf8' });
    }
}

export const logger = {
    setEnv: (env) => { ENV = env; },
    log: (message, data = null) => log(levels.log, message, data),
    info: (message, data = null) => log(levels.info, message, data),
    warn: (message, data = null) => log(levels.warn, message, data),
    error: (message, data = null) => log(levels.error, message, data),
    success: (message, data = null) => log(levels.success, message, data)
};