import mongoose from "mongoose";
 const database= ()=>{
    return mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connected")
}).catch((err)=>{console.log(err.message)});
 }

 export default database;

