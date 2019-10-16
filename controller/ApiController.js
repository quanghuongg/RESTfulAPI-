let model;
const jwt = require('jsonwebtoken');
let config = require('../config/database');

class ApiController {
    constructor() {
        let Model = require("../model/model");
        model = new Model();
    }

    async postRegister(req, res) {

        if (!req.body.username || !req.body.password) {
            return res.send({
                code: 1,
                message: "Please enter username and password!"
            })
        }
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name || "DisplayName"
        res.setHeader('Content-Type', 'application/json');
        if (!await model.isExistsUser(username) && await model.createNewUser(username, password, name)) {
            res.statusCode = 200;
            return res.send({
                code: 0,
                message: "Success"
            });
        }
        res.statusCode = 500;
        return res.send({
            code: 1,
            message: "Username is existed"
        });
    }

    async postLogin(req, res) {
        let username = req.body.username || "";
        let password = req.body.password || "";
        res.setHeader('Content-Type', 'application/json');
        let user = await model.isLoginSuccess(username, password)
        if (user) {
            res.statusCode = 200;
            const token = jwt.sign({
                username: username,
                name: user.name
            }, config.secret, {expiresIn: '1h'});
            return res.send({
                code: 0,
                message: "Success",
                token: token
            });
        }
        res.statusCode = 500;
        return res.send({
            code: 1,
            message: "Username or password is incorrect"
        });
    }

    async getUserInfo(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        return res.send(req.dataUsers);
    }
}

module.exports = new ApiController();