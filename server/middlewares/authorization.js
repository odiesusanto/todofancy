const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authorizaton = (req, res, next) => {
    if (req.headers.token == undefined) {
        res.status(401).json({
            msg: `Not authorized!`
        })
    } else {
        let userCheck = jwt.verify(req.headers.token, process.env.secret_key);

        User.findOne({
            _id: userCheck.id
        })
        .then(user => {
            if (user == null) {
                res.status(404).json({
                    msg: `Not found`
                })
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
}

module.exports = authorizaton;