const fs = require('fs');
const deleteFilesConfig = require('./delete-files.json');

const fileExtensions = deleteFilesConfig.fileExtensions;

// Xóa các tệp có đuôi chỉ định
fileExtensions.forEach(extension => {
  fs.readdirSync('.')
    .filter(file => file.endsWith(extension))
    .forEach(file => {
      fs.unlinkSync(file);
      console.log(`Deleted file: ${file}`);
    });
});