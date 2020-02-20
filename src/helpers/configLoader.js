import fs from 'fs';

export function loadConfig(path){
    const configString = fs.readFileSync(path);
    return JSON.parse(configString);
}