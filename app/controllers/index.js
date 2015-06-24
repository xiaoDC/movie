var Movie;

Movie = require('../models/movie');

exports.index = function(req, res) {

  /* index page */
  console.log(req.session.user);
  return Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }
    return res.render("index", {
      title: '电影首页',
      movies: movies
    });
  });
};
