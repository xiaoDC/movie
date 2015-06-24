Comment = require '../models/comment'

### comment save ###
exports.save = (req, res)->
    _comment = req.body.comment

    if _comment.cid
        Comment.findById _comment.cid, (err, comment)->
            reply =
                from: _comment.from
                to: _comment.tid
                content: _comment.content

            comment.reply.push reply

            comment.save (err, comment)->
                console.log err if err
                res.redirect "/movie/#{movieId}"
    else
        movieId = _comment.movie
        comment = new Comment _comment

        comment.save (err, comment)->
            if err
                console.log err

            res.redirect "/movie/#{movieId}"

