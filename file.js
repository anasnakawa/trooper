import { promises as fs } from 'fs';
import path from 'path';

import { logger } from './logger.js';

export function from(source) {
    const filePath = path.join(global.BASE_PATH, source);
    logger.info(`reading data from file ${filePath} ...`);
    return fs.readFile(filePath, 'utf8')
        .then(data => JSON.parse(data));
}

export function fromAbsolute(source, parse = false) {
    logger.info(`reading data from file ${source} ...`);
    return fs.readFile(source, 'utf8')
        .then(data => {
            if(parse) return JSON.parse(data)
            return data
        });
}

export function toJSON(source, data) {
    const filePath = path.join(global.BASE_PATH, source);
    logger.info(`writing data to file ${filePath} ...`);
    return fs.writeFile(filePath, JSON.stringify(data, null, 4));
}

export function to(source, data) {
    const filePath = path.join(global.BASE_PATH, source);
    logger.info(`writing data to file ${filePath} ...`);
    return fs.writeFile(filePath, data);
}

export function toAbsolute(source, data) {
    logger.info(`writing data to file ${source} ...`);
    return fs.writeFile(source, data);
}