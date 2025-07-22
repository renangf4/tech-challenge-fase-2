import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    title: String,
    description : String,
    date: String,
});

const Notification = mongoose.model("notification",notificationSchema);

export default Notification;