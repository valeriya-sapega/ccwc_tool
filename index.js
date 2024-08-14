#!/usr/bin/env node

import fs from 'fs';

const getData = (data) => {
    return {
        '-c': Buffer.byteLength(data),
        '-l': data.split('\n').length,
        '-w': data.trim().split(/\s+/).length,
        '-m': data.length,
    };
};

const commands = ['-c', '-l', '-w', '-m'];

const processFile = () => {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.length > 2) {
        console.log(
            'Coding Challenge wc – word, line, character, and byte count\nUse ccwc -c|-l|-w|-m [filePath]'
        );
        return;
    }

    if (args.length === 1) {
        if (fs.existsSync(args[0])) {
            const fileData = fs.readFileSync(args[0], 'utf8');
            const data = getData(fileData);
            console.log(data['-c'], data['-l'], data['-w'], args[0]);
        } else if (commands.includes(args[0])) {
            let data = '';
            process.stdin.on('data', (chunk) => {
                data += chunk;
            });

            process.stdin.on('end', () => {
                const output = getData(data)[args[0]];
                console.log(output);
            });
        } else {
            console.log('Invalid command or file path.');
        }
    }

    if (args.length === 2) {
        const [command, file] = args;

        if (!commands.includes(command)) {
            console.log('Invalid command.');
            return;
        }

        if (!fs.existsSync(file)) {
            console.log('File not found.');
            return;
        }

        const fileData = fs.readFileSync(file, 'utf8');
        const output = getData(fileData)[command];
        console.log(output, file);
    }
};

try {
    processFile();
} catch (error) {
    console.log(error.message);
}
