var Comment, CommentSchema, mongoose;

mongoose = require('mongoose');

CommentSchema = require('../schemas/comment');

Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
