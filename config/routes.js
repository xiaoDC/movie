var Comment, Index, Movie, User;

Index = require('../app/controllers/index');

User = require('../app/controllers/user');

Movie = require('../app/controllers/movie');

Comment = require('../app/controllers/comment');

module.exports = function(app) {
  app.use(function(req, res, next) {
    var _user;
    _user = req.session.user;
    app.locals.user = _user;
    return next();
  });
  app.get('/', Index.index);
  app.post('/user/signup', User.signup);
  app.post('/user/signin', User.signin);
  app.get('/user/logout', User.logout);
  app.get('/admin/users', User.signinRequired, User.adminRequired, User.list);
  app.get('/signin', User.showSignin);
  app.get('/signup', User.showSignup);
  app.get('/movie/:id', Movie.detail);
  app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie["new"]);
  app.get("/admin/update/:id", User.signinRequired, User.adminRequired, Movie.update);
  app.get("/admin/movies", User.signinRequired, User.adminRequired, Movie.list);
  app["delete"]("/admin/movies", User.signinRequired, User.adminRequired, Movie.del);
  return app.post("/user/comment", User.signinRequired, Comment.save);
};
