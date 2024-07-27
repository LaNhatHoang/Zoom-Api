const fs = require('fs');
const dotenv = require('dotenv');

if (fs.existsSync('.env.dev')) {
    dotenv.config({ path: '.env.dev' });
} else {
    dotenv.config({ path: '.env' });
}


module.exports = {
    accountId: process.env.ACCOUNT_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    email: process.env.EMAIL,
    authFile: `${__dirname}\\auth.json`,
    meetingFile: `${__dirname}\\meeting.json`
}