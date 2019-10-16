let MongoClient = require('mongodb').MongoClient;
let config = require('../config/database');
let url = config.database;
let dbo;

class Model {
    constructor() {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
            if (err) throw err;
            console.log('Connect database success!');
            dbo = db.db("jwt_token");
        });
    }

    async createNewUser(username, password, name) {
        let user = {username: username, password: password, name: name, createdAt: Date.now()};
        let res = await dbo.collection("users").insertOne(user);
        if (res) {
            return true;
        }
        return false;

    }

    async isExistsUser(username) {
        let query = {username: username};

        let res = await dbo.collection("users").findOne(query);
        return res;
    }

    async isLoginSuccess(username, password) {
        let query = {username: username, password: password};
        let res = await dbo.collection("users").findOne(query);

        return res;
    }
}

module.exports = Model;