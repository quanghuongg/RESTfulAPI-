let express = require('express');
let router = express.Router();
let apiController = require("../controller/ApiController");

let jwtToken = require("../config/passport");

/* GET home page. */
router.post('/user/login', apiController.postLogin);
router.post('/user/register', apiController.postRegister);
router.get("/me", jwtToken, apiController.getUserInfo);
module.exports = router;
