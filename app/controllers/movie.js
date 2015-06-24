var Comment, Movie, _;

Movie = require('../models/movie');

Comment = require('../models/comment');

_ = require('underscore');


/* detail page */

exports.detail = function(req, res) {
  var id;
  id = req.params.id;
  return Movie.findById(id, function(err, movie) {
    return Comment.find({
      movie: id
    }).populate('from', 'name').populate('reply.from reply.to', 'name').exec(function(err, comments) {
      console.log(comments);
      return res.render("detail", {
        title: "电影-" + movie.title + "-影片详情页",
        movie: movie,
        comments: comments
      });
    });
  });
};


/* admin update movie */

exports.update = function(req, res) {
  var id;
  id = req.params.id;
  if (id) {
    return Movie.findById(id, function(err, movie) {
      return res.render('admin', {
        title: '后台更新',
        movie: movie
      });
    });
  }
};


/* admin new movie */

exports["new"] = function(req, res) {
  var _movie, id, movieObj;
  id = req.body.movie._id;
  movieObj = req.body.movie;
  if (id) {
    return Movie.findById(id, function(err, movie) {
      var _movie;
      if (err) {
        console.log(err);
      }
      _movie = _.extend(movie, movieObj);
      return _movie.save(function(err, movie) {
        if (err) {
          console.log(err);
        }
        return res.redirect("/movie/" + movie._id);
      });
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
    return _movie.save(function(err, movie) {
      if (err) {
        console.log(err);
      }
      return res.redirect("/movie/" + movie._id);
    });
  }
};


/* admin movie list page */

exports.list = function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }
    res.render("list", {
      title: '后台-影片列表',
      movies: movies
    });
  });
};


/*  movielist delete page */

exports.del = function(req, res) {
  var id;
  id = req.query.id;
  if (id) {
    return Movie.remove({
      _id: id
    }, function(err, movie) {
      if (err) {
        return console.log(err);
      } else {
        return res.json({
          sucesee: 1
        });
      }
    });
  }
};
