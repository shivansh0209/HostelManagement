import mongoose,{Schema} from "mongoose";


const messMenuSchema = new Schema({
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
    day:{
        type:String,
        required:true,
        trim:true
    },
    breakfast:{
        type:String,
        required:true,
        trim:true
    },
    lunch:{
        type:String,
        required:true,
        trim:true
    },
    dinner:{
        type:String,
        required:true,
        trim:true
    },
    snacks:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});


const MessMenu = mongoose.model("MessMenu", messMenuSchema);
export default MessMenu;