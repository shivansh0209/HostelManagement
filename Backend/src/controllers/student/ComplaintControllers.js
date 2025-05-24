import Complaint from "../../models/complaintModel.js";
import ApiError from "../../utilities/ApiErrorUtility.js";
import ApiResponse from "../../utilities/ApiResponseUtility.js";
import asyncHandler from "../../utilities/AsyncHandlerUtility.js";



const createComplaint = asyncHandler(async (req, res) => {
    const {type, title, description } = req.body;

    if (!type || !title || !description) {
        throw new ApiError("Please fill all the fields", 400);
    }

    const complaint = await Complaint.create({
        hostel:req.user.hostel,
        type,
        title,
        description,
        photo:"",
        createdBy: req.user._id
    });
    if (!complaint) {
        throw new ApiError(400, "Complaint not created");
    }

    res.status(200).json(new ApiResponse(201, "Complaint Created Successfully", {complaint}));
})



const getAllComplaints = asyncHandler(async (req, res) => {
    const user= req.user;
    let complaints;
    if(req.user.profileType === "student")
        complaints = await Complaint.find({ createdBy: user._id });
    else if(req.user.profileType === "staff")
        complaints = await Complaint.find({ hostel: user.hostel }).populate("createdBy" , "name block roomNumber");
    if (!complaints) {
        throw new ApiError(400, "No complaints found");
    }
    res.status(200).json( new ApiResponse(200, "Complaints fetched successfully", { complaints }));
})


const markResolved = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, { status: true }, { new: true });
    if (!complaint) {
        throw new ApiError(400, "Complaint not found");
    }
    res.status(200).json(new ApiResponse(200, "Complaint marked as resolved", { complaint }));
}
)

export { createComplaint, getAllComplaints, markResolved };
