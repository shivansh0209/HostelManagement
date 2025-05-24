import User from "../../models/userModel.js";
import ApiError from "../../utilities/ApiErrorUtility.js";
import ApiResponse from "../../utilities/ApiResponseUtility.js";
import asyncHandler from "../../utilities/AsyncHandlerUtility.js";
import uploadOnCloudinary from "../../utilities/CloudinaryUtility.js";
import PersonalNotification from "../../models/personalNotification.js";

const sendProfileData = asyncHandler(async (req, res) => {
    const studentId= req.params.studentId;
    const student = await User.findById(studentId).select("-password -refreshToken");
    if (!student) {
        return res.status(404).json(new ApiError(404, "Student not found"));
    }
    return res.status(200).json(new ApiResponse(200, "Student Profile Data", { student }));

})


const sendStudentList = asyncHandler(async (req, res) => {
    const staff = req.user;
    const { searchQuery } = req.query; 
    let query = {
        hostel: staff.hostel,
        profileType: "student"
    };
    if (searchQuery) {
        query = {
            ...query,
            $or: [
                { name: { $regex: `^${searchQuery}`, $options: "i" } },
                { rollNumber: { $regex: `^${searchQuery}`, $options: "i" } },
            ],
        };
    }
    const studentsList = await User.find(query)
        .select("_id name block roomNumber rollNumber messName messReciept academicReceipt");
    if (!studentsList || studentsList.length === 0) {
        return res.status(404).json(new ApiResponse(200, "No students found", []));
    }
    res.status(200).json(new ApiResponse(200, "Student List", { studentsList }));
});



const addAStudent = asyncHandler(async (req, res) => {
    const studentDetails = req.body;

    let profilePictureLink = '';
    let messRecieptLink = '';
    let academicReceiptLink = '';


    //AI integrate kar skte hai who can check the file whether a valid reciept or not
    if (req.files && req.files.profilePic && req.files.profilePic.length > 0) {
        let result = await uploadOnCloudinary(req.files.profilePic[0].path);
        profilePictureLink = result.url; // or result.secure_url if you prefer secure link
    }

    if (req.files && req.files.messReciept && req.files.messReciept.length > 0) {
        let result = await uploadOnCloudinary(req.files.messReciept[0].path);
        messRecieptLink = result.url;
    }

    if (req.files && req.files.academicReceipt && req.files.academicReceipt.length > 0) {
        let result = await uploadOnCloudinary(req.files.academicReceipt[0].path);
        academicReceiptLink = result.url;
    }

    const newStudent = {...studentDetails, profilePic:profilePictureLink, messReciept:messRecieptLink, academicReceipt:academicReceiptLink, profileType: "student"};
    const finalStudent =await User.create(newStudent);
    await finalStudent.generateRefreshToken();

    res.status(200).json(new ApiResponse(200, "Student added", { }));
})

const sendPersonalNotification = asyncHandler(async (req, res) => {
    const {studentIds, message } = req.body;
    studentIds.forEach(async (studentId) => {
        await PersonalNotification.create({
            userId: studentId,
            content: message || "Submit your fines asap.",
        });
    })
    res.status(200).json(new ApiResponse(200, "Notification sent", { }));
})

const getAllPersonalNotifications = asyncHandler(async (req, res) => {
    const notifications = await PersonalNotification.find({ userId: req.user._id });
    if (!notifications || notifications.length === 0) {
        return res.status(404).json(new ApiResponse(200, "No notifications found", []));
    }
    res.status(200).json(new ApiResponse(200, "Notifications fetched successfully", { notifications }));
})


export { sendProfileData, sendStudentList, addAStudent, sendPersonalNotification, getAllPersonalNotifications };