const fs = require('fs/promises');
const path = require('path');

async function getFileInfo() {
    try {
        const filePath = path.join(__dirname, 'data', 'example.txt');
        
        try {
            await fs.access(filePath);
            const stats = await fs.stat(filePath);
            
            console.log(`File exists: true`);
            console.log(`File size: ${stats.size} bytes`);
            console.log(`File created at: ${stats.birthtime}`);
            
            return {
                exists: true,
                size: stats.size,
                createdAt: stats.birthtime
            };
        } catch (error) {
            console.log(`File does not exist at path: ${filePath}`);
            return {
                exists: false
            };
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

module.exports = { getFileInfo };
