var Comment;

Comment = require('../models/comment');


/* comment save */

exports.save = function(req, res) {
  var _comment, comment, movieId;
  _comment = req.body.comment;
  if (_comment.cid) {
    return Comment.findById(_comment.cid, function(err, comment) {
      var reply;
      reply = {
        from: _comment.from,
        to: _comment.tid,
        content: _comment.content
      };
      comment.reply.push(reply);
      return comment.save(function(err, comment) {
        if (err) {
          console.log(err);
        }
        return res.redirect("/movie/" + movieId);
      });
    });
  } else {
    movieId = _comment.movie;
    comment = new Comment(_comment);
    return comment.save(function(err, comment) {
      if (err) {
        console.log(err);
      }
      return res.redirect("/movie/" + movieId);
    });
  }
};
