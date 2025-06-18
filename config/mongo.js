const mongoose= require('mongoose');


const connectMongoBD =  async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MongoDB Conntected");
        
    } catch(err){
        console.error(' MongoBD connection error:' , err.message)
        process.exit(1);
    }
}


module.exports = connectMongoBD;