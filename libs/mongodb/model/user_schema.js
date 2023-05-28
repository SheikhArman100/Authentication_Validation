import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Users = models.user || model('user', userSchema); //create user database.if not created yet,then create new database called user

export default Users;