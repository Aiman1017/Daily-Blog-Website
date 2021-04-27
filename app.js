const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
//Step 1
const mongoose = require('mongoose');
const _ = require('lodash');

const homeContent = "Hello all Welcome to My Daily Blog Website. This is a public Blog website where everyone can write any topic they want.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Step 3
const postSchema = {
  title: String,
  bodyContent: String
};
//Step 4
const Post = mongoose.model('Post', postSchema);

//Step 2
//The localhost is by default
mongoose.connect('mongodb://localhost:27017/daily-blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", function(req,res){
  //Step 7
  Post.find({}, function(err, posts){
    res.render('home', {
      homeContent: homeContent,
      posts: posts
    });
  });
});

app.get('/about', function(req,res){
  res.render('about');
});

app.get('/contact', function(req,res){
  res.render('contact');
});

app.get('/compose', function(req,res){
  res.render('compose');
});

app.get('/post/:postId', function(req,res){
  const urlDataParam = req.params.postId;

  //Step 8
  Post.findOne({_id: urlDataParam}, function(err, post){
    res.render('post', {
      title: post.title,
      content: post.bodyContent
    });
  });
});

app.post('/compose', function(req,res){
  //Step 5
  const post = Post({
    title: req.body.postTitle,
    bodyContent: req.body.postBody
  });
  //Step 6
  post.save(function(err){
    if(err){
      return console.log(err);
    }else{
      res.redirect('/');
    }
  });
});

app.listen(1000, function(){
 console.log('The server is starting at port 1000');
});