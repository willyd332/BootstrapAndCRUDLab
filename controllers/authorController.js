const express = require('express');
const router  = express.Router();
const Author = require('../models/authorSchema')
const Article = require('../models/articleSchema')


router.get('/', function(req,res){
  Author.find({},(err,authorsArr)=>{
    if (err){
      console.log(err);
    } else {
      res.render('author-views/index.ejs', {
        authors: authorsArr
      })
    }
  })
})

router.get('/:id', function(req,res){
  Author.findById(req.params.id, (err,foundAuthor)=>{
      if (err){
        console.log(err);
      } else {
        res.render('author-views/show.ejs', {
          author: foundAuthor
        })
      }
    }).populate('articles')
})















module.exports = router
