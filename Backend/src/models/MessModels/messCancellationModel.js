import mongoose, {Schema} from "mongoose";


const messCancellationSchema = new Schema({
    hostel:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
    from:{
        type:Date,
        required:true
    },
    to:{
        type:Date,
        required:true
    },
    mealType:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    messName:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
});


const MessCancellation = mongoose.model("MessCancellation", messCancellationSchema);
export default MessCancellation;