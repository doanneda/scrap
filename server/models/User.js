const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    username: { type: String, require: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    // scrapPages: [ // establishes a one-to-many relationship between a user and their scrapbook pages
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'ScrapPage', // Reference the ScrapPage model
    //     },
    //   ],    
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: "7d" })
    return token 
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data)
}

module.exports = { User, validate };