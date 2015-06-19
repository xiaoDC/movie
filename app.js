var Movie, _, app, bodyParser, express, favicon, mongoose, path, port;

express = require('express');

port = process.env.PORT || 3000;

mongoose = require('mongoose');

path = require('path');

bodyParser = require('body-parser');

Movie = require('./models/movie');

_ = require('underscore');

favicon = require('serve-favicon');

app = express();

mongoose.connect('mongodb://localhost/movies');

app.set('views', './views/pages/');

app.use(express["static"](path.join(__dirname, 'build')));

app.use(bodyParser());

app.use(favicon(path.join(__dirname, 'build/img/favicon.ico')));

app.set('view engine', 'jade');

app.locals.moment = require('moment');

app.listen(port);

console.log("imooc started on port " + port);


/* index page */

app.get("/", function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }
    res.render("index", {
      title: '电影首页',
      movies: movies
    });
  });
});


/* detail page */

app.get("/movie/:id", function(req, res) {
  var id;
  id = req.params.id;
  Movie.findById(id, function(err, movie) {
    res.render("detail", {
      title: "电影-" + movie.title + "-影片详情页",
      movie: movie
    });
  });
});


/* admin update movie */

app.get("/admin/update/:id", function(req, res) {
  var id;
  id = req.params.id;
  if (id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: '后台更新',
        movie: movie
      });
    });
  }
});


/* admin post movie */

app.post("/admin/movie/new", function(req, res) {
  var _movie, id, movieObj;
  id = req.body.movie._id;
  movieObj = req.body.movie;
  if (id) {
    Movie.findById(id, function(err, movie) {
      var _movie;
      if (err) {
        console.log(err);
      }
      _movie = _.extend(movie, movieObj);
    });
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      flash: movieObj.flash
    });
  }
  _movie.save(function(err, movie) {
    if (err) {
      console.log(err);
    }
    res.redirect("/movie/" + movie._id);
  });
});


/* admin  list page */

app.get("/admin/list", function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }
    res.render("list", {
      title: '后台-影片列表',
      movies: movies
    });
  });
});


/* list delete page */

app["delete"]("/admin/list", function(req, res) {
  var id;
  id = req.query.id;
  if (id) {
    Movie.remove({
      _id: id
    }, function(err, movie) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          sucesee: 1
        });
      }
    });
  }
});


/* admin page */

app.get("/admin/movie", function(req, res) {
  res.render('admin', {
    title: '后台管理页面',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      language: '',
      summary: '',
      poster: '',
      flash: ''
    }
  });
});
