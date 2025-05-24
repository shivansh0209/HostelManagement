import User from "../../models/userModel.js"
import ApiError from "../../utilities/ApiErrorUtility.js";
import ApiResponse from "../../utilities/ApiResponseUtility.js";
import asyncHandler from "../../utilities/AsyncHandlerUtility.js";
import MessMenu from "../../models/MessModels/messMenumodel.js";
import MessFeedback from "../../models/MessModels/messFeedbackModel.js";
import MessCancellation from "../../models/MessModels/messCancellationModel.js";


const allocateMess = asyncHandler(async (req, res) => {
    const { studentIds, messName } = req.body;

    if (studentIds.length===0 || !messName) {
        return res.status(400).json(new ApiError(400, "Student IDs and Mess Name are required"));
    }
    const students = await User.updateMany(
        { _id: { $in: studentIds } },
        { messName: messName }
    );

    if (!students) {
        return res.status(404).json(new ApiError(404, "Students not found"));
    }
    return res.status(200).json(new ApiResponse(200, "Mess allocated successfully", { students }));
})



const createOrUpdateMessMenu = asyncHandler(async (req, res) => {
    const { messName, day, breakfast, lunch, dinner, snacks } = req.body;
    const hostel = req.user.hostel;
    if (!messName || !day || !breakfast || !lunch || !dinner || !snacks) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    const messMenu = await MessMenu.findOneAndUpdate(
        { hostel, messName, day },
        { breakfast, lunch, dinner, snacks },
        { new: true, upsert: true }
    );

    return res.status(200).json(new ApiResponse(200, "Mess menu created/updated successfully", { messMenu }));
}
);

const sendMenu = asyncHandler(async (req, res) => {
    const hostel = req.user.hostel;
    const menu = await MessMenu.find({ hostel });
    if (!menu) {
        return res.status(404).json(new ApiError(404, "Mess menu not found"));
    }
    return res.status(200).json(new ApiResponse(200, "Mess menu fetched successfully", { menu }));
}
);


const senAllMessFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await MessFeedback.find({ hostel: req.user.hostel });
    if (!feedbacks) {
        return res.status(404).json(new ApiError(404, "No feedbacks found"));
    }
    return res.status(200).json(new ApiResponse(200, "Feedbacks fetched successfully", { feedbacks }));
})


const approveMessCancellation = asyncHandler(async (req, res) => {  
    const { id } = req.params;

    const messCancellation = await MessCancellation.findByIdAndUpdate(id, { status: true }, { new: true });

    if (!messCancellation) {
        throw new ApiError(400, "No Mess Cancellation Found");
    }

    res.status(200).json(new ApiResponse(200, "Mess Cancellation Approved", { messCancellation }));
})

export { allocateMess , createOrUpdateMessMenu, sendMenu, senAllMessFeedbacks, approveMessCancellation} ;