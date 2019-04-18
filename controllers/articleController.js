const express = require('express');
const router = express.Router();
const Article = require('../models/articleSchema')
const Author = require('../models/authorSchema')


router.get('/', function(req, res) {
  Article.find({}, (err, articlesArr) => {
    if (err) {
      console.log(err);
    } else {
      res.render('article-views/index.ejs', {
        articles: articlesArr
      })
    }
  })
})

router.get('/:id', function(req, res) {
  Article.findById(req.params.id, (err, foundArticle) => {
    if (err) {
      console.log(err);
    } else {
      res.render('article-views/show.ejs', {
        article: foundArticle
      })
    }
  }).populate('author')
})

router.get('/:id/new', function(req, res) {
  Author.findById(req.params.id, (err, foundAuthor) => {
    if (err) {
      console.log(err);
    } else {
      res.render('article-views/new.ejs', {
        author: foundAuthor
      })
    }
  })
})

router.post('/:id', function(req, res) {
  let articleId;
  Article.create({
    title: req.body.title,
    content: req.body.content,
    author: req.params.id
  }, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      Author.findByIdAndUpdate(req.params.id, {
        $push: {
          articles: article._id
        }
      }, (err, foundAuthor) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect(`/authors/${req.params.id}`)
        }
      })
    }
  })
})

router.get('/:id/edit', function(req, res) {
  Article.findById(req.params.id, (err, foundArticle) => {
    if (err) {
      console.log(err);
    } else {
      res.render('article-views/edit.ejs', {
        article: foundArticle
      })
    }
  })
})

router.put('/:id', function(req, res) {
  Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  }, (err, foundArticle) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/articles/${foundArticle._id}`)
    }
  })
})

router.delete('/:id', function(req, res) {
  Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/articles')
    }
  })
})








module.exports = router
