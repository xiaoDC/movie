var SALT_WORK_FACTOR, UserSchema, bcrypt, mongoose;

mongoose = require('mongoose');

bcrypt = require('bcrypt');

SALT_WORK_FACTOR = 10;

UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
  role: {
    type: Number,
    "default": 0
  },
  meta: {
    createAt: {
      type: Date,
      "default": Date.now()
    },
    updateAt: {
      type: Date,
      "default": Date.now()
    }
  }
});

UserSchema.pre('save', function(next) {
  var self;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  self = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(self.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      self.password = hash;
      next();
    });
  });
});

UserSchema.methods = {
  comparePassword: function(_password, cb) {
    return bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      return cb(null, isMatch);
    });
  }
};

UserSchema.statics = {
  fetch: function(cb) {
    return this.find({}).sort('meta.updateAt').exec(cb);
  },
  findById: function(id, cb) {
    return this.findOne({
      _id: id
    }).exec(cb);
  }
};

module.exports = UserSchema;
