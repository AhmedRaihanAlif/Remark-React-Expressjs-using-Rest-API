const express = require("express");
const router = express.Router();

const {
    getContacts,
    compareOtp,
    updateContact,
    deleteContact,
    get,
    requisitionRequestListPerUpdate,
    requisitionRequestList,
    requisitionRequestListPer,
    requisitionRequest,
    userLogin,
    sendOtp,
    getProducts,
    getSales,
    userSignup,
    requisitionPost,
   
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
router.route("/requisitionrequestlist/get").get(requisitionRequestList);
router.route("/requisitionrequestlistper/getper/:user_id").get(requisitionRequestListPer);
router.route("/requisition/get").get(requisitionRequest);

router.route("/requisition/post").post(requisitionPost);
router.route("/userlogin").post(userLogin);
router.route("/:user_id").put(updateContact);
router.route("/requisitionrequestlistper/editper/:user_id").put(requisitionRequestListPerUpdate);

//router.route("/updatesales/:id").put(updateSales);
router.route("/:id").delete(deleteContact);
router.route("/send-otp").post(sendOtp);
router.route("/compareOtp").post(compareOtp);


module.exports = router;