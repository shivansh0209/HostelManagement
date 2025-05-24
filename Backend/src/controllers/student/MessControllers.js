import MessCancellation from "../../models/MessModels/messCancellationModel.js";
import ApiError from "../../utilities/ApiErrorUtility.js";
import ApiResponse from "../../utilities/ApiResponseUtility.js";
import asyncHandler from "../../utilities/AsyncHandlerUtility.js";
import MessFeedback from "../../models/MessModels/messFeedbackModel.js";


const createMessCancellation = asyncHandler(async (req, res) => {
    const { from, to, mealType , amount } = req.body;

    if (!from || !to || !mealType) {
        throw new ApiError("Please fill all the fields", 400);
    }

    const messCancellation = await MessCancellation.create({
        hostel: req.user.hostel,
        from,
        to,
        mealType,
        amount,
        createdBy: req.user._id,
        messName: req.user.messName
    });
    if (!messCancellation) {
        throw new ApiError(400, "Mess Cancellation not created");
    }

    res.status(200).json(new ApiResponse(201, "Mess Cancellation Created Successfully", { messCancellation }));
})


const sendAllCancellations = asyncHandler(async (req, res) => {
    let messCancellations;
    if(req.user.profileType === "student") {
        messCancellations = await MessCancellation.find({ createdBy: req.user._id });
    } else if (req.user.profileType === "staff") {
        messCancellations = await MessCancellation.find({ hostel: req.user.hostel }).populate("createdBy", "name email");
    }

    if (!messCancellations) {
        throw new ApiError(400, "No Mess Cancellation Found");
    }

    res.status(200).json(new ApiResponse(200, "Mess Cancellations Found", { messCancellations }));
})


const deleteMessCancellation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const messCancellation = await MessCancellation.findByIdAndDelete(id);

    if (!messCancellation) {
        throw new ApiError(400, "No Mess Cancellation Found");
    }

    res.status(200).json(new ApiResponse(200, "Mess Cancellation Deleted", { messCancellation }));
})


const createMessFeedback = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content) {
        throw new ApiError("Please fill all the fields", 400);
    }

    const messFeedback = await MessFeedback.create({
        hostel: req.user.hostel,
        content,
        messName: req.user.messName
    });
    if (!messFeedback) {
        throw new ApiError(400, "Mess Feedback not created");
    }
    console.log(content);
    res.status(200).json(new ApiResponse(201, "Mess Feedback Created Successfully", { messFeedback }));
    
})




export {createMessCancellation, sendAllCancellations, deleteMessCancellation, createMessFeedback};