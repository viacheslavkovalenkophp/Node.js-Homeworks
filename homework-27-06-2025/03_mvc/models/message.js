const fs = require('fs');
const path = require('path');
const { escape } = require('html-escaper');

const filePath = path.join(__dirname, '../data.json');

module.exports = {
  getAll() {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return []; 
    }
  },

  add(message) {
    const messages = this.getAll();
    messages.push({
      text: escape(message), 
      timestamp: Date.now()
    });
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
  }
};