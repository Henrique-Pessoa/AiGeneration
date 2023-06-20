import mongoose from "mongoose";


const connectDb = (url)=>{
    mongoose.set("strictQuery",true)
    mongoose.connect(url)
    .then(()=>console.log("MongoDb connect"))
    .catch((e)=>console.log(e))
}


export default connectDb