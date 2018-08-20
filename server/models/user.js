const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    }, 
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true,
        validate: {
            validator: function(input) {
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(input);
            }
        }
    }, 
    password: {
        type: String,
        // required: [true, "Password is required"]
    }, 
    fbId: String
}, {timestamps: true});

var User = mongoose.model('User', userSchema);

module.exports = User;