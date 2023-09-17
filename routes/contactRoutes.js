
const express = require("express");
const router = express.Router();
const {
    getContacts,
    
    updateContact,
    deleteContact,
    get,
    userLogin,
    
getProducts,
getSales,
userSignup}=require("../controllers/contactController");
const checkLogin=require("../middleware/checkLogin");

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

module.exports = router;