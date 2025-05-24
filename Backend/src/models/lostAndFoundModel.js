import mongoose, {Schema} from 'mongoose';


const lostAndFoundSchema = new Schema({
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


const LostAndFound = mongoose.model('LostAndFound', lostAndFoundSchema);
export default LostAndFound;