let jwt = require('jsonwebtoken');
let config = require('../config/database');

verifyToken = function (req, res, next) {
    let authorization = req.headers.authorization || "";
    authorization = authorization.split(" ");
    let jwtFromRequest = authorization[1];
    jwt.verify(jwtFromRequest, config.secret, function (err, data) {
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            return res.send({
                code: 1,
                message: "Invalid Token"
            });
        }
        req.dataUsers = data;
        next();
    })
}
module.exports = verifyToken;