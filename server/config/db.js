const mongoos=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const uri=process.env.MONGODB_URI;
const connectDB=async()=>{
    console.log(uri);
    try{
        await mongoos.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true
        });
        console.log('MongoDB connected');
    }catch(error){
        console.log('Error connecting to MongoDB');
    }
}
module.exports=connectDB;