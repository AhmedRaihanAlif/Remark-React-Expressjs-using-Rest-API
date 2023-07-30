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