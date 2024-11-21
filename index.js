import dotenv from 'dotenv';
import { program } from "commander";
import fs from 'fs';
import path from 'path';

// local modules
import { logger } from './logger.js';
import * as file from './file.js';
import * as util from './util.js';

// environment variables
dotenv.config({ path: './.env' });

// Check if the file exists
util.verifyFileExist('./DYNAMIC_FOLDER');
let DYNAMIC_FOLDER = fs.readFileSync('./DYNAMIC_FOLDER', 'utf8').trim();

// globals
global.BASE_PATH = `data/${DYNAMIC_FOLDER}/`;

// has to be called twice, because the first call will create the folder
util.verifyPathExist(global.BASE_PATH);

// global settings
logger.setEnv(`${DYNAMIC_FOLDER}`);
logger.info('Setting up environment...');
logger.info(`Base path set to ${global.BASE_PATH}`);

// log every command
program
    .hook('preAction', (thisCommand) => {
        logger.success(`node index.js ${thisCommand.args.join(' ')}`)
    });

// commands
program
    .command('set')
    .option('-f, --folder <folder>', 'folder to set as base path')
    .action(async (options) => {
        util.verifyPathExist(global.BASE_PATH);

        await file.toAbsolute('./DYNAMIC_FOLDER', options.folder);
        logger.info(`DYNAMIC_FODLER set to ${options.folder}`);
    });

program
    .command('copy')
    .option('-s, --source <source>', 'source of the players')
    .option('-o, --output <output>', 'output file')
    .option('-j, --json', 'output as json')
    .action(async (options) => {
        let fileName = path.basename(options.source);
        if(options.output) {
            fileName = options.output;
        }

        const data = await file.fromAbsolute(options.source);
        const copied = JSON.parse(JSON.stringify(data));
        if(options.json) {
            await file.toJSON(`${fileName}`, copied);
        } else {
            await file.to(`${fileName}`, copied);
        }
        logger.info('file copied successfully');
    });

program.parse();