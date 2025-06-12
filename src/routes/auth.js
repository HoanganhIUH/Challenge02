/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Quản lý xác thực
 */

const express = require("express");
const router = express.Router();
const authController = require("../controller/auth_controller");


router.post("/register",
    /* #swagger.tags = ['Auth'] */
     authController.register);
router.post("/verify-otp",
    /* #swagger.tags = ['Auth'] */
     authController.verifyOTP);
router.post("/login",
    /* #swagger.tags = ['Auth'] */ 
    authController.login);

module.exports = router;


