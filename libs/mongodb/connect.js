import mongoose from "mongoose";


const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if(connection.readyState == 1){
            console.log("DB Connection Successfull!")
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error)
    }
}

export default connectMongo;

