import mongoose from 'mongoose'; 

const connectDB= async ()=>{
   try{
    await mongoose.connect(process.env.MONGODB_URL,{});
    console.log("DataBase connected!!");
   }
   catch(error){
    console.log("DataBase connection error",error);
    process.exit(1); //to exit the processon failure
   }
  

}
export default connectDB;