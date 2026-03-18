import mongoose from "mongoose"

const ConnectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("Database Is Connected Successfully");
        
    } catch (error) {
        console.log("DB Not Connected",error);
        
        
    }
}
export default ConnectDb;