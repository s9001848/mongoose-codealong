const mongoose = require('mongoose');

// create a schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    meta: {
        age: Number,
        website: String
    }
}, {
    timestamps: true
});

userSchema.methods.sayHello = function() {
    return "Hi " + this.name;
  };

const User = mongoose.model('User', userSchema);

// make this available to our other files
module.exports = User;