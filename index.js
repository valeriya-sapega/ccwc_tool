#!/usr/bin/env node

import fs from 'fs';
import { countBytes, countLines, countWords } from './utils.js';

const [command, file] = process.argv.slice(2);

//console.log(countBytes(args[1]), args[1]);

//console.log(fs.statSync(file));

countWords(file);
