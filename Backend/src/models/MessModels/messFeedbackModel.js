import mongoose, {Schema} from "mongoose";



const messFeedbackSchema = new Schema({
    hostel:{
        type:String,
        required:true,
        trim:true
    },
    messName:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    }

},{timestamps:true});



const MessFeedback = mongoose.model("MessFeedback", messFeedbackSchema);
export default MessFeedback;