mongoose = require 'mongoose'

MovieSchema = new mongoose.Schema {
  doctor: String
  title: String
  language: String
  country: String
  summary: String
  flash: String
  poster: String
  year: String
  meta: {
    createAt:{
      type: Date
      default: Date.now()
    }
    updateAt:{
      type: Date
      default: Date.now()
    }
  }
}

MovieSchema.pre 'save', (next)->
  if this.isNew
    this.meta.createAt = this.meta.updateAt = Date.now()
  else
    this.meta.updateAt = Date.now()
  next()
  return

MovieSchema.statics = {
  fetch: (cb)->
    this
    .find {}
    .sort 'meta.updateAt'
    .exec cb
  findById: (id, cb)->
    this
    .findOne _id: id
    .exec cb
}

module.exports = MovieSchema