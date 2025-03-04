const user =require('../Models/user');
const jwt =require('jsonwebtoken');
exports.createUser = ( async(req,res)=>{
    const {name, email, password}=req.body;
 try{
    const existingUser= await user.findOne({email});
    if(existingUser){
      return res.status(400).json({message: "user already exist"});   
    }
    const safeRole="user";
    const newUser= new user({name, email, password, role:safeRole});
    await newUser.save();
    const token= await newUser.generateAuthToken();
    res.status(201).json(({message: "user rgistered successfully", newUser}));
 }catch(error)
 {
    console.log("error occure when sginup ", error);
    res.status(501).json({message:"internal server error"});
 }
});

exports.loginUser= async(req, res)=>{
 const {email, password}=req.body;
 try{
const lUser=  await user.findOne({email});
if(!lUser){
 return res.status(400).json({message:"Invalid email or password"});
}
const  isMatch = await lUser.matchPassword(password);
if(!isMatch){
    return res.status(400).json({message:"Invalide email or password"});
}
// const token = await lUser.generateAuthToken();
const  token=jwt.sign(
   {_id: lUser._id, role:lUser.role},
   "thisisminiticket",
   {expiresIn: "1d"}
);
console.log(token);
console.log(lUser.$assertPopulatedrole);
res.status(200).json({message:"login successfull",
    lUser,
    token,
    role:lUser.role,
   });
 }catch(error)
 {
    console.log("error when loginig user", error);
    res.status(500).json({message:"Internal server error"});
 }

};

