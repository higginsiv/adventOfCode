import fs from 'fs';
import path from 'path';

// Define the directory where you want to check for README.md files
const directoryPath = path.join('..');

// Function to process a file
function processFile(filePath) {
    // Read the file
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            return console.error('Unable to read file: ' + err);
        }

        // Process the file line by line
        let lines = data.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('---')) {
                // Turn into header
                lines[i] = '# ' + lines[i].substring(3, lines[i].length - 4);
            } else if (lines[i].startsWith('Your puzzle answer')) {
                // Turn into header 3
                lines[i] = '### ' + lines[i];
            }
        }

        // Write the changes back to the file
        fs.writeFile(filePath, lines.join('\n'), 'utf8', function(err) {
            if (err) {
                return console.error('Unable to write to file: ' + err);
            }
        });
    });
}

// Function to recursively read directories
function readDirectory(directory) {
    fs.readdir(directory, function(err, files) {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }

        files.forEach(function(file) {
            let fullPath = path.join(directory, file);

            fs.stat(fullPath, function(err, stats) {
                if (err) {
                    return console.error('Unable to get file stats: ' + err);
                }

                if (stats.isDirectory()) {
                    // If file is a directory, read it recursively
                    readDirectory(fullPath);
                } else if (file === 'README.md') {
                    // If file is README.md, process it
                    processFile(fullPath);
                }
            });
        });
    });
}

// Start reading from the directory you selected
readDirectory(directoryPath);