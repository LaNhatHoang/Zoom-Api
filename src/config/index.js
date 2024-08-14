const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

if (fs.existsSync('.env.dev')) {
    dotenv.config({ path: '.env.dev' });
} else {
    dotenv.config({ path: '.env' });
}

const appDataPath = process.env.APPDATA;

const myFolderPath = path.join(appDataPath, 'ZoomApi');


function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    // console.log(`Folder created at: ${folderPath}`);
  } else {
    // console.log(`Folder already exists at: ${folderPath}`);
  }
}

createFolderIfNotExists(myFolderPath);

module.exports = {
    accountId: process.env.ACCOUNT_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    email: process.env.EMAIL,
    authFile: `${myFolderPath}\\auth.json`,
    meetingFile: `${myFolderPath}\\meeting.json`
}