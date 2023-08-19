const bcrypt = require('bcrypt');
const axios = require("axios");
const pool = require("../database");
const jwt=require('jsonwebtoken');

const get=( async (req, res) => {
  try {
    // Make a request to the different API to get the data
    const response = await axios.get('http://192.168.60.88:5002/api/v1/get');
    console.error(response);
      
    // Here, you may need to process or transform the data if necessary
    const data = response.data;

    // Return the data to the client
    res.json(data);
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching data from different API:', error.message);
    res.status(500).json({ error: 'Error fetching data from different API' });
  }
});

const getContacts= async (req,res)=>{
   await pool.query("SELECT * FROM accounts ORDER BY user_id ASC ",(error,result)=>{
        if(error)
        throw error;
        
        
        res.status(200).json(result.rows);
          
        }
    )
  

}
const getContact = (req, res) => {
    const user_id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM accounts WHERE user_id = $1', [user_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }
  const getProducts = (req, res) => {
  //  const product_id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM products ', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  const newlogin = (req, res) => {
    
  const { user_id, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in the database
          pool.query('INSERT INTO accounts (user_id,password,email) VALUES ($1, $2,$3) RETURNING *', [user_id, password,email], (error, results) => {
              if (error) {
                throw error
              }
           res.status(201).send(`User added with login ID: ${results.rows[0].user_id}`)
              res.status(200).json(results.rows[0]);
            })
      });
  })


      // const hashedPassword = bcrypt.hash(password,10);
      //  pool.query('INSERT INTO userlogin (user_id,password) VALUES ($1, $2) RETURNING *', [user_id, hashedPassword], (error, results) => {
      //   if (error) {
      //     throw error
      //   }
      // //  res.status(201).send(`User added with login ID: ${results.rows[0].user_id}`)
      //   res.status(200).json(results.rows[0]);
      // })
    
  
    
  }
  const createContact = (req, res) => {
    const { user_id, password,email } = req.body
  
    pool.query('INSERT INTO accounts (user_id,password, email) VALUES ($1, $2,$3) RETURNING *', [user_id,password, email], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
    })
  }
  const createloginapp = (req, res) => {
    const { id,name,mail,phone, password,role } = req.body
  
    pool.query('INSERT INTO users (id,name, email, phone,role,password) VALUES ($1, $2, $3,$4,$5,$6) RETURNING id,name,email,phone,role',[id,name,mail,phone, password,role], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }
  const createSignup = async (req, res) => {
    const { user_id,username,email,password } = req.body
    
    const salt=await bcrypt.genSalt();
    const pass=await bcrypt.hash(password,salt);
    
    
    pool.query('INSERT INTO login (user_id, username,email,password) VALUES ($1, $2,$3,$4) RETURNING *', [user_id,username,email,pass], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
  })
 }
  //netsh wlan show profile LakeView  key=clear
const createLogin = async (req, res) => {
    const { user_id,username,password} = req.body

 const newUser=await pool.query('SELECT * FROM login where username =$1',[username]);
 if(newUser.rows.length != 0){
  const isValidPassword=await bcrypt.compare(password,newUser.rows[0].password);
  if(isValidPassword){
    const token = jwt.sign({
      username:username,
      userid:user_id,
    },'alif',{expiresIn:'50 days'});
    res.status(200).json({
      "access_token":token,
      "message":"Login Successful"
    })
     pool.query('INSERT INTO token_login (user_id, usertoken) VALUES ($1, $2) RETURNING *', [user_id,token], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added in token login with ID: ${results.rows[0].user_id}`)
  })


  }else{
    res.status(401).json({"error ":"Login filed"});
  }
  //return res.status(401).send(`User is already taken`);
 }
 else{
  res.status(401).json({"error ":" failed"});
 }


  // pool.query('INSERT INTO accounts (user_id, email,password) VALUES ($1, $2,$3) RETURNING *', [user_id,email,password], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
  // })
 }



  // emailVerifier.verify(email, (err, data) => {
  //   if (err) {
  //     return res.status(500).json({ error: 'Error verifying email' });
  //   }

  //   if (!data.smtpCheck) {
  //     return res.json({ exists: false });
  //   }

  //   return res.json({ exists: true });
  // });

  
  
    
  
    // pool.query('INSERT INTO new_accounts (user_id,password, email) VALUES ($1, $2,$3) RETURNING *', [user_id,password, email], (error, results) => {
    //   if (error) {
    //     throw error
    //   }
    //   res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
    // })



  const updateContact = (request, response) => {
    const user_id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE accounts SET  email = $1 WHERE user_id = $2',
      [ email, user_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${user_id}`)
      }
    )
  }
  const deleteContact = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM accounts WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

// const updateContact=(req,res)=>{
//     res.status(200).json({message:`Update Contacts ${req.params.id}`});
// };

// const deleteContact=(req,res)=>{
//     res.status(200).json({message:`Delete Contacts ${req.params.id}`});
// };


module.exports={getContacts,createContact,updateContact,deleteContact,getContact,get,newlogin,createLogin,createSignup,getProducts,createloginapp};