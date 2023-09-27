
const express = require("express");
const router = express.Router();
const transporter=require("../middleware/otp");
const {
    getContacts,
    compareOtp,
    updateContact,
    deleteContact,
    get,
    userLogin,
    sendOtp,
    
getProducts,
getSales,
userSignup}=require("../controllers/contactController");
const checkLogin=require("../middleware/checkLogin");
// function generateOTP() {
//     return Math.floor(1000 + Math.random() * 9000).toString();
//   }
// router.use(checkLogin);
router.use("/private", require("../middleware/checkLogin.js"));
router.route("/get").get(get);
router.route("/").get(getContacts);
router.route("/private/getsales").get(getSales);
// router.route("/:id").get(getContact); 
router.route("/products").get(getProducts);
//router.route("/").post(createContact);
// router.route("/login").post(createloginapp);
// router.route("/signup").post(createSignup);
router.route("/usersignup").post(userSignup);
router.route("/userlogin").post(userLogin);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);
router.route("/send-otp").post(sendOtp);
router.route("/compareOtp").post(compareOtp);


module.exports = router;