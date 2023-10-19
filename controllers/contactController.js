const bcrypt = require("bcrypt");
const axios = require("axios");
const pool = require("../database");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middleware/checkLogin");
// const express = require("express");
// const router = express.Router();
const transporter = require("../middleware/otp");
//const checkLogin=require("../middleware/checkLogin");

const get = async (req, res) => {
  try {
    // Make a request to the different API to get the data
    const response = await axios.get("http://192.168.60.88:5002/api/v1/get");
    console.error(response);

    // Here, you may need to process or transform the data if necessary
    const data = response.data;

    // Return the data to the client
    res.json(data);
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching data from different API:", error.message);
    res.status(500).json({ error: "Error fetching data from different API" });
  }
};

const getContacts = async (req, res) => {
  await pool.query(
    "SELECT * FROM accounts ORDER BY user_id ASC ",
    (error, result) => {
      if (error) throw error;

      res.status(200).json(result.rows);
    }
  );
};
// const getUsers = async (req, res) => {
//   await pool.query(
//     "SELECT * FROM stock_requisition where  ",
//     (error, result) => {
//       if (error) throw error;

//       res.status(200).json(result.rows);
//     }
//   );
// };

const getSales = async (req, res) => {
  console.log("getsales func er vitore : " + req.user_role);

  await pool.query(
    "SELECT * FROM usersignup ORDER BY user_id ASC ",
    (error, result) => {
      if (error) throw error;

      // const dataToSend = {
      //   rows: result.rows,
      //   userRole:req.user_role,
      //   userId:req.user_id

      
      // };
      
      res.status(200).json(result.rows);
    }
  );
};

const getContact = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  console.log(req.originalUrl);

  pool.query(
    "SELECT * FROM accounts WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        console.log(error.message);

        // throw error
      }
      res.status(200).json(results.rows);
    }
  );
};

const getProducts = (req, res) => {
  //  const product_id = parseInt(req.params.id)

  pool.query("SELECT * FROM products ", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

//   const newlogin = (req, res) => {

//   const { user_id, password } = req.body;
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(password, salt, function(err, hash) {
//           // Store hash in the database
//           pool.query('INSERT INTO accounts (user_id,password,email) VALUES ($1, $2,$3) RETURNING *', [user_id, password,email], (error, results) => {
//               if (error) {
//                 throw error
//               }
//            res.status(201).send(`User added with login ID: ${results.rows[0].user_id}`)
//               res.status(200).json(results.rows[0]);
//             })
//       });
//   })

// }
// const createContact = (req, res) => {
//   const { user_id, password,email } = req.body

//   pool.query('INSERT INTO accounts (user_id,password, email) VALUES ($1, $2,$3) RETURNING *', [user_id,password, email], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
//   })
// }
//   const createloginapp = (req, res) => {
//     const { id,name,mail,phone, password,role } = req.body

//     pool.query('INSERT INTO users (id,name, email, phone,role,password) VALUES ($1, $2, $3,$4,$5,$6) RETURNING id,name,email,phone,role',[id,name,mail,phone, password,role], (error, results) => {
//       if (error) {
//         throw error
//       }
//       res.status(201).send(`User added with ID: ${results.rows[0].id}`)
//     })
//   }
//   const createSignup = async (req, res) => {
//     const { user_id,username,email,password } = req.body

//     const salt=await bcrypt.genSalt();
//     const pass=await bcrypt.hash(password,salt);

//     pool.query('INSERT INTO login (user_id, username,email,password) VALUES ($1, $2,$3,$4) RETURNING *', [user_id,username,email,pass], (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
//   })
//  }
////////Remark website er jnnw Signup from Admin

var compareotpp;
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOtp = async (response, req, res) => {
  try {
    console.log(response + "response");

    const email = response;
    console.log(email + "email");
    const otpp = generateOTP();
    console.log(otpp + "otp");
    compareOtpp = otpp;
    console.log("compareotp" + compareOtpp);

    // Create an email message
    const mailOptions = {
      from: "ahmedraihanalif@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otpp}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // You can save the OTP in a database for validation later

    res.json({ message: "OTP sent successfully" });
    // return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    // res.json({ message: 'Internal Server Error' });
    //res.status(500).json({ error: 'Internal Server Error' });
  }
};
const compareOtp = async (req, res) => {
  console.log(req.body);
  console.log("Teri ooo");
  const { verificationcode } = req.body;
  console.log(verificationcode);
  console.log(JSON.stringify(verificationcode));
  console.log("Compareotp: " + compareOtpp);
  var myBooleanValue = null;
  if (verificationcode === compareOtpp) {
    myBooleanValue = true;
    res.status(200).json({ success: true, data: myBooleanValue });
    console.log(res);
  } else {
    myBooleanValue = false;
    res.status(200).json({ success: true, data: myBooleanValue });
  }
};
const userSignup = async (req, res) => {
  const {user_id, user_name,user_email,user_password,user_role} = req.body;
  const otp = sendOtp(user_email);
  console.log(otp + "sign up otp");
  const salt = await bcrypt.genSalt();
  const pass = await bcrypt.hash(user_password, salt);

  pool.query(
    "INSERT INTO userSignup (user_id, user_name,user_password,user_role) VALUES ($1, $2,$3,$4) RETURNING *",
    [user_id, user_name, pass, user_role],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].user_id}`);
    }
  );
};

const requisitionPost = async (req, res) => {
  const { users_id, itemName, quantity, reason, neededDate, status } = req.body;

  pool.query(
    "INSERT INTO stock_requisition (user_id, item_name, quantity, reason, needed_date, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [users_id, itemName, quantity, reason, neededDate, status],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }

      // console.log('Query results:', results);

      //const rowCount = results.rows[0].count;
      res
        .status(201)
        .send(`Request Added for this user : ${results.rows[0].user_id}`);
    }
  );
};

const requisitionRequest = async (req, res) => {
  console.log("queryString");
  const status = "pending";

  const queryString = "SELECT COUNT(*) FROM stock_requisition  ";
  const values = [status];

  const result = pool.query(
    "SELECT COUNT(*) FROM stock_requisition where status = $1",
    values,
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }

      // console.log('Query results:', results);

      //const rowCount = results.rows[0].count;
      res.status(201).send(` ${results.rows[0].count}`);
    }
  );
  console.log("Query results:", result);
};

const requisitionRequestList = (req, res) => {
  //  const product_id = parseInt(req.params.id)

  pool.query(
    "  SELECT stock_requisition.user_id, usersignup.user_name, stock_requisition.item_name, stock_requisition.quantity,stock_requisition.reason,stock_requisition.needed_date,stock_requisition.status FROM stock_requisition JOIN usersignup ON stock_requisition.user_id = usersignup.user_id where status='pending' ",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
const requisitionRequestListPer = (req, res) => {
  const user_id =  req.params.user_id;

  pool.query(
    "SELECT stock_requisition.user_id, usersignup.user_name, stock_requisition.item_name, stock_requisition.quantity,stock_requisition.reason,Date(stock_requisition.needed_date),stock_requisition.status FROM stock_requisition  JOIN usersignup ON stock_requisition.user_id = usersignup.user_id  where stock_requisition.user_id=$1 and stock_requisition.status='pending'",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const requisitionRequestListPerUpdate = (request, response) => {
  const user_id =request.params.user_id;
  const { quantity,needed_date,item_name } = request.body;

  pool.query(
    "UPDATE stock_requisition SET quantity = $1,needed_date=$2,status='Approved' WHERE item_name =$3 and user_id = $4",
    [ quantity,needed_date,item_name,user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${user_id}`);
    }
  );
};



const userLogin = async (req, res) => {
  console.log("Come this userlogin");
  const { user_id, user_password } = req.body;

  const newUser = await pool.query(
    "SELECT * FROM usersignup where user_id =$1",
    [user_id]
  );
  console.log("hola");

  if (newUser.rows.length != 0) {
    console.log("hola 2");
    const isValidPassword = await bcrypt.compare(
      user_password,
      newUser.rows[0].user_password
    );
    if (isValidPassword) {
      const token = jwt.sign(
        {
          user_id: newUser.rows[0].user_id,
          user_name: newUser.rows[0].user_name,
          user_role: newUser.rows[0].user_role,
        },
        "alif2023",
        { expiresIn: "5 days" }
      );
      res.status(200).json({
        access_token: token,
        message: "Login Successful",
        user_role: newUser.rows[0].user_role,
      });
    } else {
      res.status(401).json({ "error ": "Password Invalid" });
    }
    //return res.status(401).send(`User is already taken`);
  } else {
    res.status(401).json({ "error ": "Login failed" });
  }
};

const updateContact = (request, response) => {
  const user_id = parseInt(request.params.user_id);
  const { email } = request.body;

  pool.query(
    "UPDATE accounts SET  email = $1 WHERE user_id = $2",
    [email, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${user_id}`);
    }
  );
};
const deleteContact = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM accounts WHERE user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

// const updateContact=(req,res)=>{
//     res.status(200).json({message:`Update Contacts ${req.params.id}`});
// };

// const deleteContact=(req,res)=>{
//     res.status(200).json({message:`Delete Contacts ${req.params.id}`});
// };

module.exports = {
  requisitionRequest,
  requisitionRequestListPer,
  requisitionRequestList,
  getSales,
  getContacts,
  updateContact,
  deleteContact,
  getContact,
  get,
  
  userLogin,
  getProducts,
  userSignup,
  sendOtp,
  compareOtp,
  requisitionPost,
  requisitionRequestListPerUpdate,
};
