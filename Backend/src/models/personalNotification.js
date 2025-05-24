import mongoose,{Schema} from "mongoose";


const personalNotificationSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});


const PersonalNotification = mongoose.model("PersonalNotification", personalNotificationSchema);
export default PersonalNotification;