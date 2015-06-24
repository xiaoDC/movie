mongoose = require 'mongoose'
bcrypt = require 'bcrypt'
SALT_WORK_FACTOR = 10

UserSchema = new mongoose.Schema
    name:
        unique: true
        type: String
    password:
        unique: true
        type: String
    # 0 normal user
    # 1 verified user
    # 2 professional user
    # >10 admin
    # >50 super admin
    role:
        type: Number
        default: 0
    meta:
        createAt:
            type: Date
            default: Date.now()
        updateAt:
            type: Date
            default: Date.now()

UserSchema.pre 'save', (next)->
    if this.isNew
        this.meta.createAt = this.meta.updateAt = Date.now()
    else
        this.meta.updateAt = Date.now()
    self = this
    bcrypt.genSalt SALT_WORK_FACTOR, (err, salt)->
        if err
            return next err
        bcrypt.hash self.password, salt, (err, hash)->
            if err
                return next err
            self.password = hash
            next()
            return
        return
    return

UserSchema.methods =
    comparePassword: (_password, cb)->
        bcrypt.compare _password, this.password, (err, isMatch)->
            if err
                return cb(err)
            cb null, isMatch

UserSchema.statics =
    fetch: (cb)->
        this
        .find {}
        .sort 'meta.updateAt'
        .exec cb
    findById: (id, cb)->
        this
        .findOne _id: id
        .exec cb

module.exports = UserSchema