const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');

module.exports = {

    register: (req, res) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user == null) {
                    let salt = bcrypt.genSaltSync(10);
                    let password = bcrypt.hashSync(req.body.password, salt);
                    // console.log('=====', req.body);

                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: password,
                    })
                        .then(userData => {
                            res.status(200).json({
                                msg: `Registration successful!`,
                                data: userData,
                            })
                        })
                        .catch(err => {
                            res.status(500).json(err.message)
                        })
                } else {
                    res.status(500).json({
                        msg: `Data already exist`,
                        data: user
                    })
                }
            })

            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    signIn: (req, res) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user) {
                    let password = bcrypt.compareSync(req.body.password, user.password);

                    if (password) {
                        var token = jwt.sign({ id: user.id, email: user.email }, process.env.secret_key);
                        res.status(200).json({
                            msg: `Login successful!`,
                            token: token
                        })
                    } else {
                        res.status(401).json({
                            msg: `Email/Password invalid`
                        })
                    }
                } else {
                    res.status(401).json({
                        msg: `Email/Password invalid`
                    })
                }
            })

            .catch(err => {
                res.status(500).json(err.message)
            })
    }, 

    signInFB: (req, res) => {
        let authResponse = req.body.token
        // console.log('===', authResponse)

        let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`;
        axios.get(url_user_info)
        .then(result => {
            // console.log('---', result)
            User.findOne({
                email: result.data.email
            })
            .then(found => {
                // console.log("found---", found)
                if (found == null) {
                    User.create({
                        name: result.data.name,
                        email: result.data.email,
                        userId: result.data.id})
                    .then(userData => {
                        var token = jwt.sign({id: userData._id, name: userData.name, email: userData.email}, process.env.secret.key);
                        res.status(200).json(token);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
                } else {
                    var token = jwt.sign({found}, process.env.secret_key);
                    res.status(200).json(token);
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
        })
    }
}