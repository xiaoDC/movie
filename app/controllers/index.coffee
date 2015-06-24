Movie = require '../models/movie'

exports.index = (req, res)->
    ### index page ###
    console.log req.session.user
    Movie.fetch (err, movies)->
        if err
            console.log err
        res.render "index",
            title: '电影首页'
            movies: movies


