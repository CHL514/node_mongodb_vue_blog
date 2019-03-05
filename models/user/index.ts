const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	user_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

adminSchema.index({id: 1});

const User = mongoose.model('User', adminSchema);


// 在路由中引入
module.exports = User