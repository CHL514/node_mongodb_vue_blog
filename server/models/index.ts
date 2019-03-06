import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/myBlog', {useNewUrlParser: true})

export default mongoose.model('User', new mongoose.Schema({
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
