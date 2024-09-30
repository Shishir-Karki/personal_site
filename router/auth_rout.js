const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/auth_controller");
const validate = require("../middlewares/validate-middleware");
const {signUpSchema, loginSchema} = require("../validators/aauth-validators");


// home router
router.route("/").get(authcontroller.home);

 //register a user
router.route("/register")
.post(validate(signUpSchema), authcontroller.register);

//login  
router.route("/login").
post(validate(loginSchema), authcontroller.login);



module.exports=router;
