const express = require("express");
const cors=require("cors");
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;
const checkLogin = require("../ExpressJS_Crud/middleware/checkLogin.js");
const { route } = require("./routes/contactRoutes.js");
// const errorHandler=(err,req,res,next)=>{
//   if(res.headerSent){
//     return next(err);

//   }
//   res.status(500).json({error:err});
// }
// app.use(errorHandler);
 //app.use(checkLogin);
// app.use("/private", require("../ExpressJS_Crud/middleware/checkLogin.js"));
app.use("/api/contacts",require("./routes/contactRoutes.js"));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

