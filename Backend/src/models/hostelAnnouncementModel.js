import mongoose, {Schema} from 'mongoose';


const hostelAnnouncementSchema = new Schema({
    hostel : {
        type: String,
        required: true,
        trim: true
    },
    content : {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps:true} )


const HostelAnnouncement = mongoose.model('HostelAnnouncement', hostelAnnouncementSchema);
export default HostelAnnouncement;