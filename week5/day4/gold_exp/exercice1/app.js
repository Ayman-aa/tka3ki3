const { getFileInfo } = require('./file-info');

(async () => {
  try {
    console.log('File Information:');
    await getFileInfo();
  } catch (error) {
    console.error('Error in app.js:', error.message);
  }
})();