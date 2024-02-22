const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: false,
  },
  solution: {
    type: String,
    required: false,
  },
});

const CodeBlock = mongoose.model('Problems', codeBlockSchema);

module.exports = CodeBlock;