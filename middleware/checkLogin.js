const jwt =require("jsonwebtoken");

const checkLogin=(req,res,next)=>{
    

    console.log("Come this func");
    
const { authorization } = req.headers;
console.log(authorization);
try{
console.log("Here check");
const token = authorization.split(' ')[1];
const decoded = jwt.verify(token,'alif2023');
const {user_id,user_name,user_role}=decoded;
req.user_id=user_id;
req.user_name=user_name;
req.user_role=user_role;

console.log(decoded);
console.log(user_role);
// if(req.user_role==1){
//     next();
// }

// else{
//     alert('Why came here MF');
    
// }
next();

}catch(err){
next("Authentication Failure");
console.log(err.message)
}
}
module.exports = checkLogin;