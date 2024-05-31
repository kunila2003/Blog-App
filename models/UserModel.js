const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
     username: {
          type: String,
          require: [true, 'user is required']
     },
     email: {
          type: String,
          require: [true, 'email is required']
     },
     password: {
          type: String,
          require: [true, 'password is required']
     },
     blogs: [
          {
               type: mongoose.Types.ObjectId,
               ref: 'Blog',
          },
     ],
}, { timestamps: true })
const UserModel = mongoose.model('User', userSchema)


module.exports = UserModel