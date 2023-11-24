import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_DB || '');
export const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
