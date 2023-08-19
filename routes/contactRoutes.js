
const express = require("express");
const router = express.Router();
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
    get,
    createLogin,
    createSignup,
getProducts,
createloginapp}=require("../controllers/contactController");


router.route("/get").get(get);
router.route("/").get(getContacts);
// router.route("/:id").get(getContact); 
router.route("/products").get(getProducts);
router.route("/").post(createContact);
router.route("/login").post(createloginapp);
router.route("/signup").post(createSignup);
//router.route("/login").post(createLogin);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

module.exports = router;