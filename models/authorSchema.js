const mongoose = require('mongoose')


const authorSchema = new mongoose.Schema(
  {

  }
)


const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
