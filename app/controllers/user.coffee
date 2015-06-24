User = require '../models/user'

### userlist page ###
exports.list = (req, res)->
    User.fetch (err, users)->
        if err
            console.log err
        res.render "userlist",
            title: '用户列表页'
            users: users


### showSignin page ###
exports.showSignin = (req, res)->
    res.render 'siginin',
        title: '用户登录页面'

### showSignup page ###
exports.showSignup = (req, res)->
    res.render 'signup',
        title: '用户注册页面'


# signup
exports.signup = (req, res)->
    _user = req.body.user
    User.find name: _user.name, (err, user)->
        console.log err if err
        if user.length > 0
            res.redirect '/'
        else
            user = new User _user
            user.save (err, user)->
                console.log err if err
                res.redirect '/admin/users'

# signin
exports.signin = (req, res)->
    _user = req.body.user
    name = _user.name
    password = _user.password
    User.findOne name: name, (err, user)->
        console.log err if err
        if !user
            res.redirect '/'
        user.comparePassword password, (err, isMatch)->
            console.log err if err
            if isMatch
                req.session.user = user
                res.redirect '/'
            else
                console.log '用户密码错误'
                res.redirect '/'


# user logout
exports.logout = (req, res)->
    delete req.session.user
    # delete app.locals.user
    res.redirect '/'


# midware for user
exports.signinRequired = (req, res, next)->
    user = req.session.user

    if !user
        res.redirect '/signin'
    next()

# midware for admin
exports.adminRequired = (req, res, next)->
    user = req.session.user

    if user.role <= 10
        res.redirect '/signin'
    next()