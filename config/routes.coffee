Index = require '../app/controllers/index'
User = require '../app/controllers/user'
Movie = require '../app/controllers/movie'
Comment = require '../app/controllers/comment'


module.exports = (app)->
    app.use (req, res, next)->
        _user = req.session.user
        app.locals.user = _user
        next()

    app.get '/', Index.index                    # index page

    app.post '/user/signup', User.signup        # user signup
    app.post '/user/signin', User.signin        # user signin
    app.get '/user/logout', User.logout         # user logout
    app.get '/admin/users', User.signinRequired, User.adminRequired, User.list       # user signin
    app.get '/signin', User.showSignin       # user signin
    app.get '/signup', User.showSignup       # user signup

    app.get '/movie/:id', Movie.detail          # movie detail
    app.get '/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new       # movie new
    app.get "/admin/update/:id", User.signinRequired, User.adminRequired, Movie.update   # movie update
    app.get "/admin/movies", User.signinRequired, User.adminRequired, Movie.list      # movie list
    # app.post "/admin/movie", User.signinRequired, User.adminRequired, Movie.save      # movie list
    app.delete "/admin/movies", User.signinRequired, User.adminRequired, Movie.del    # movie del

    # comment
    app.post "/user/comment", User.signinRequired, Comment.save      # post comment




