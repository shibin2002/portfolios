const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

// Create build directory
if (!fs.existsSync('build')) {
    fs.mkdirSync('build');
    console.log('Created build directory');
}

// Copy index.html
fs.copyFileSync('index.html', 'build/index.html');
console.log('Copied index.html');

// Copy Assets directory recursively
function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

if (fs.existsSync('Assets')) {
    copyRecursive('Assets', 'build/Assets');
    console.log('Copied Assets directory');
}

console.log('Build completed successfully!');
