var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = express();

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(bodyParser);
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.raw());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));

var articleProvider= new ArticleProvider();


app.get('/', function(req, res){
    articleProvider.findAll( function(error,docs){
      if(error){
        console.error(error);
        return res.status(400);
      }

      if (docs) {
          console.log('articles found: ', docs);
         // console.log(JSON.stringify(docs));
      }

      res.render('index.jade', {
          title: 'Blog',
          articles: docs
      });
    })
});


app.get('/', function(req, res) {
    res.render('blog_new.jade', { 
        title: 'New Post'
    
    });
});

app.post('/', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/')
    });
});


app.listen(3000, function() {
  console.log('Server hhhh started on port %s', 3000);
});