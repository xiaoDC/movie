var User;

User = require('../models/user');


/* userlist page */

exports.list = function(req, res) {
  return User.fetch(function(err, users) {
    if (err) {
      console.log(err);
    }
    return res.render("userlist", {
      title: '用户列表页',
      users: users
    });
  });
};


/* showSignin page */

exports.showSignin = function(req, res) {
  return res.render('siginin', {
    title: '用户登录页面'
  });
};


/* showSignup page */

exports.showSignup = function(req, res) {
  return res.render('signup', {
    title: '用户注册页面'
  });
};

exports.signup = function(req, res) {
  var _user;
  _user = req.body.user;
  return User.find({
    name: _user.name
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (user.length > 0) {
      return res.redirect('/');
    } else {
      user = new User(_user);
      return user.save(function(err, user) {
        if (err) {
          console.log(err);
        }
        return res.redirect('/admin/users');
      });
    }
  });
};

exports.signin = function(req, res) {
  var _user, name, password;
  _user = req.body.user;
  name = _user.name;
  password = _user.password;
  return User.findOne({
    name: name
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res.redirect('/');
    }
    return user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err);
      }
      if (isMatch) {
        req.session.user = user;
        return res.redirect('/');
      } else {
        console.log('用户密码错误');
        return res.redirect('/');
      }
    });
  });
};

exports.logout = function(req, res) {
  delete req.session.user;
  return res.redirect('/');
};

exports.signinRequired = function(req, res, next) {
  var user;
  user = req.session.user;
  if (!user) {
    res.redirect('/signin');
  }
  return next();
};

exports.adminRequired = function(req, res, next) {
  var user;
  user = req.session.user;
  if (user.role <= 10) {
    res.redirect('/signin');
  }
  return next();
};
