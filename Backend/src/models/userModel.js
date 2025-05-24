import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    fatherName: {
        type: String,
        trim: true,
    },
    programme: {
        type: String,
        enum:['B.Tech', 'M.Tech', 'PhD','IDD'],
        trim: true,
    },
    motherName: {
        type: String,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    rollNumber: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    permanentAddress: {
        type: String,
        trim: true,
    },
    hostelAddress: {
        type: String,
        trim: true,
    },
    profilePic: {
        type: String,
        trim: true,
    },
    bloodGroup: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        trim: true,
    },
    academicYear: {
        type: String,
        trim: true,
    },
    semester: {
        type: String,
        trim: true,
    },
    profileType: {
        type: String,
        enum: ['student', 'staff','admin'],
    },
    messReciept: {
        type: String,
        trim: true,
    },
    academicReceipt: {
        type: String,
        trim: true,
    },
    messName: {
        type: String,
        enum: ['A', 'B', 'C', 'none'],
        trim: true,
    },
    roomNumber: {
        type: String,
        trim: true,
    },
    block: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'none'],
        trim: true,
    },
    hostel: {
        type: String,
        required: true,
        trim: true,
    },
    refreshToken: {
        type: String,
    },
    personalNotification: {
        type: [String],
    },
    nationality: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
        trim: true,
    },
    fatherContact:{
        type: String,
        trim: true,
    },
    motherContact:{
        type: String,
        trim: true,
    },
},{
    timestamps: true,
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = async function() {
    const refreshToken = jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );

    this.refreshToken = refreshToken;
    await this.save();

    return refreshToken;
};



const User = mongoose.model('User', userSchema);
export default User;