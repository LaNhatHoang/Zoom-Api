const fs = require('fs')

module.exports = {
    readFile: (filePath) => {
        try {
            const str = fs.readFileSync(filePath, "utf8");
            return JSON.parse(str);
        } catch (error) {
            throw error
        }
    },
    writeFile: (filePath, data) => {
        try {
            fs.writeFileSync(filePath, JSON.stringify(data));
        } catch (error) {
            throw error
        }
    }
}