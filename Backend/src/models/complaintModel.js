import mongoose , {Schema} from "mongoose";



const complaintSchema = new Schema({
    hostel : {
        type: String,
        required: true,
        trim: true
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status : {
        type: Boolean,
        required: true,
        default: false
    },
    type : {
        type: String,
        enum: ['Electrical', 'Maintenance', 'Mechanical', 'Plumbing', 'Cleaning', 'Internet', 'Security', 'Others'],
        required: true,
        default: 'Others',
        trim: true
    },
    title : {
        type: String,
        required: true,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    photo : {
        type: String,
        required: false,
        trim: true
    },

} , {timestamps:true} )


const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;