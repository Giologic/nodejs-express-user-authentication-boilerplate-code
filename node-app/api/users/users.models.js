// users.models.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { hash, compare } = require('../../utils/bcrypt-promise');

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', async function() {
  try {
    if (this.isModified('password') || this.isNew) {
      const hashedPassword = await hash(this.password);

      this.password = hashedPassword;
    }
  } catch (error) {
    throw new Error(error);
  }
});

UserSchema.methods.comparePassword = async function(password) {
  return await compare(password, this.password);
};

UserSchema.methods.toJSON = function() {
  return {
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email
  }
};

module.exports = mongoose.model('User', UserSchema);
