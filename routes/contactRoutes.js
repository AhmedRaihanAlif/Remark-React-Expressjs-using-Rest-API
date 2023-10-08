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
    userSignup,
    requisition,
    getContact}=require("../controllers/contactController");

router.use("/private", require("../middleware/checkLogin.js"));
router.route("/:user_id").get(getContact);
router.route("/").get(getContacts);
router.route("/private/getsales").get(getSales);

// router.route("/:id").get(getContact); 
router.route("/products").get(getProducts);
//router.route("/").post(createContact);
// router.route("/login").post(createloginapp);
// router.route("/signup").post(createSignup);
router.route("/usersignup").post(userSignup);
router.route("/requisition").post(requisition);
router.route("/userlogin").post(userLogin);
router.route("/:user_id").put(updateContact);
//router.route("/updatesales/:id").put(updateSales);
router.route("/:id").delete(deleteContact);
router.route("/send-otp").post(sendOtp);
router.route("/compareOtp").post(compareOtp);


module.exports = router;