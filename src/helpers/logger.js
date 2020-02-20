export class Logger {
    static info(text, ...rest){
        const total = text + '\n' + _argumentsToString(rest);
        console.log(`[${_nowFormat()}] ${total}`);
    }

    static warn(text, ...rest){
        const total = text + '\n' + _argumentsToString(rest);
        console.warn(`[${_nowFormat()}] ${total}`);
    }

    static error(text, ...rest){
        const total = text + '\n' + _argumentsToString(rest);
        console.error(`[${_nowFormat()}] ${total}`);
    }
}

function _nowFormat(){
    const date = new Date().toISOString();
    return date.replace(/T|Z/g, ' ');
}

function _argumentsToString(args){
    if (!args) return '';

    let restString = '';
    args.forEach(x => {
        if (typeof(x) === 'object') restString += '\n\t' + JSON.stringify(x, 0, 4);
        else if (typeof(x) === 'string') restString += '\n\t' + x;
    })
    return restString;
}