import mongoose from "mongoose";

let isConnected=false;

export async function connect(){
    mongoose.set("strictQuery",true);
    if(!process.env.MONGODB_URI){
        console.log("MONGODB_URI is not defined");
        return;
    }
    if(isConnected){
        console.log("using existing connection");
        return;
    }

    try {
        const con=await mongoose.connect(process.env.MONGODB_URI);
        isConnected=true;
        console.log("connected to db",con.connection.host);

    } catch (error:any) {
        throw new Error("there is an error while connecting to the db",error.message);
    }
}