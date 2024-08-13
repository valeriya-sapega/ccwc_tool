import fs from 'fs';

// outputs the number of bytes in a file.
// command -c
export const countBytes = (file) => {
    const stats = fs.statSync(file);
    return stats.size;
};

// outputs the number of lines in a file
// command -l
export const countLines = (file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        const linesAmount = data.split('\n').length;
        console.log(linesAmount);
    });
};

// outputs the number of words in a file
// command -w
export const countWords = (file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        const wordCount = data.trim().split(/\s+/).length;
        console.log(wordCount);
    });
};
