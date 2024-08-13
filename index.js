#!/usr/bin/env node

import fs from 'fs';

const getData = (file) => {
    const data = fs.readFileSync(file, 'utf8');
    return {
        '-c': fs.statSync(file).size,
        '-l': data.split('\n').length,
        '-w': data.trim().split(/\s+/).length,
        '-m': data.length,
    };
};

const handleCommand = (command, file) => {
    const output = getData(file)[command];
    console.log(output, file);
};

if (process.argv.length === 3 && process.argv[2].includes('.txt')) {
    const data = getData(process.argv[2]);
    console.log(data['-c'], data['-l'], data['-w'], process.argv[2]);
} else if (process.argv.length === 4 && process.argv[3].includes('.txt')) {
    const [command, file] = process.argv.slice(2);
    handleCommand(command, file);
} else {
    console.log(
        'Coding Challenge wc – word, line, character, and byte count\nUse ccwc -c|-l|-w|-m [filePath]'
    );
}
