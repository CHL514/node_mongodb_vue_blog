const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/myBlog', {useNewUrlParser: true})

module.exports = mongoose.model('User', new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isadmin: {
    type: Boolean
  }
}))
