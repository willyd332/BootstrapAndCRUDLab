const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema(
  {
      content: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
      }
  })


const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
