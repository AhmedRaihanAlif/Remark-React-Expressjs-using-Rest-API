const pool = require("../database");

const getContacts= (req,res)=>{
    pool.query("SELECT * FROM users ORDER BY id ASC",(error,result)=>{
        if(error)
        throw error;
        res.status(200).json(result.rows);
    })
  

}
const getContact = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

const createContact = (req, res) => {
    const { name, email } = req.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  const updateContact = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  const deleteContact = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
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


module.exports={getContacts,createContact,updateContact,deleteContact,getContact};