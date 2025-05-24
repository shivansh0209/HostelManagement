import mongoose, {Schema} from 'mongoose';


const taskSchema = new Schema({
    hostel : {
        type: String,
        required: true,
        trim: true
    },
    content : {
        type: String,
        required: true,
        trim: true
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true} )


const Task = mongoose.model('Task', taskSchema);
export default Task;