import mongoose, {Schema} from "mongoose";


const fineSchema = new Schema({
    hostel:{
        type:String,
        required:true,
        trim:true
    },
    imposedOn:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    madeOn:{
        type:Date,
        default:false
    },paidOn:{
        type:Date,
        default:false
    }

},{timestamps:true});


const Fine = mongoose.model("Fine", fineSchema);
export default Fine;