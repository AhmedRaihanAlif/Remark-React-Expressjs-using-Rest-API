const express = require("express");
const cors=require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;
app.use("/api/contacts",require("./routes/contactRoutes.js"));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

//   app.listen(5002, function(){
//     var host = server.address().address
//     var port = server.address().port
//     console.log("REST API demo app listening at http://%s:%s", host, port)
// })