import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/task-manager");
        console.log("db connected successfully");
    } catch (err) {
        console.log(err);
    }
}

export default dbConnection;