const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv =require('dotenv');
dotenv.config();
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    role: { 
        type: String, 
        enum: ['user', 'admin'], default: 'user'
     }
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bycrypt.hash(user.password, 10);
    }
    next();
});


  
  //Generating JWT
userSchema.methods.generateAuthToken = async function ()
{
    const user = this;
    const token = jwt.sign({ _id: user._id.toString
    () , role: user.role}, "thisisminiticket", 
{expiresIn: '1hr'});
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.matchPassword = async function (password) {
    return await bycrypt.compare(password, this.password);
  };
const User = mongoose.model('User', userSchema);
module.exports = User;