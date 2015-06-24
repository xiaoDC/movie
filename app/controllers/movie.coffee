Movie = require '../models/movie'
Comment = require '../models/comment'
_ = require 'underscore'



### detail page ###
exports.detail = (req, res)->
    id = req.params.id
    Movie.findById id, (err, movie)->
        Comment
        .find movie: id
        .populate 'from', 'name'
        .populate 'reply.from reply.to', 'name'
        .exec (err, comments)->
            console.log comments
            res.render "detail",
                title: "电影-#{movie.title}-影片详情页"
                movie: movie
                comments: comments


### admin update movie ###
exports.update = (req, res)->
    id = req.params.id
    if id
        Movie.findById id, (err, movie)->
            res.render 'admin',
                title: '后台更新'
                movie: movie


### admin new movie ###
exports.new = (req, res)->
    id = req.body.movie._id
    movieObj = req.body.movie

    if id
        Movie.findById id, (err, movie)->
            if err
                console.log  err
            _movie = _.extend movie, movieObj
            _movie.save (err, movie)->
                if err
                    console.log err
                res.redirect "/movie/#{movie._id}"
    else
        _movie = new Movie
            doctor: movieObj.doctor
            title: movieObj.title
            country: movieObj.country
            language: movieObj.language
            year: movieObj.year
            poster: movieObj.poster
            flash: movieObj.flash
        _movie.save (err, movie)->
            if err
                console.log err
            res.redirect "/movie/#{movie._id}"


### admin movie list page ###
exports.list = (req, res)->
    Movie.fetch (err, movies)->
        if err
            console.log err

        res.render "list",
            title: '后台-影片列表'
            movies: movies
        return
    return



###  movielist delete page ###
exports.del = (req, res)->
    id = req.query.id
    if id
        Movie.remove _id: id, (err, movie)->
            if err
                console.log err
            else
                res.json sucesee: 1



#     ### admin page ###
# exports.del = (req, res)->

#     app.get "/admin/movie", (req, res)->
#         res.render 'admin',
#             title: '后台管理页面'
#             movie:
#                 title: ''
#                 doctor: ''
#                 country: ''
#                 year: ''
#                 language: ''
#                 summary: ''
#                 poster: ''
#                 flash: ''
