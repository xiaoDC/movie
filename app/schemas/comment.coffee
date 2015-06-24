mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

CommentSchema = new mongoose.Schema
    movie:
        type: ObjectId
        ref: 'Movie'
    from:
        type: ObjectId
        ref: 'User'
    reply:[
        from:
            type: ObjectId
            ref: 'User'
        to:
            type: ObjectId
            ref: 'User'
        content: String
    ]
    content: String
    meta:
        createAt:
            type: Date
            default: Date.now()
        updateAt:
            type: Date
            default: Date.now()

CommentSchema.pre 'save', (next)->
    if this.isNew
        this.meta.createAt = this.meta.updateAt = Date.now()
    else
        this.meta.updateAt = Date.now()
    next()
    return

CommentSchema.statics =
    fetch: (cb)->
        this
        .find {}
        .sort 'meta.updateAt'
        .exec cb
    findById: (id, cb)->
        this
        .findOne _id: id
        .exec cb

module.exports = CommentSchema