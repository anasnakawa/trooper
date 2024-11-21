import fs from 'fs';

export function verifyPathExist(path) {
    if (!fs.existsSync(`./${path}`)) {
        fs.mkdirSync(`./${path}`, { recursive: true });
    }
}

export function verifyFileExist(fileName) {
    if (!fs.existsSync(fileName)) {
        // Create the file with the name 'DYNAMIC_FOLDER' as its content
        fs.writeFileSync(fileName, '', 'utf8');
    }
}