import Fine from "../../models/fineModel.js";
import ApiError from "../../utilities/ApiErrorUtility.js";
import ApiResponse from "../../utilities/ApiResponseUtility.js";
import asyncHandler from "../../utilities/AsyncHandlerUtility.js";

const createFine = asyncHandler(async (req, res) => {
    const { imposedOn, type, dueDate, amount } = req.body;
    if (!imposedOn || !type || !dueDate || !amount) {
        throw new ApiError("Please fill all the fields", 400);
    }

    const fine = await Fine.create({
        hostel:req.user.hostel,
        imposedOn,
        type,
        dueDate,
        amount,
        paidOn: null,
        madeOn: new Date(),
    });

    if (!fine) {
        throw new ApiError(400, "Fine not created");
    }

    res.status(201).json(new ApiResponse(201, "Fine Created Successfully", { fine }));
}
);


const getAllFines = asyncHandler(async (req, res) => {
    let fines;
    if(req.user.profileType === "staff"){
        fines = await Fine.find({ hostel: req.user.hostel }).populate("imposedOn", "name ");
    }
    else{
        fines = await Fine.find({ imposedOn: req.user._id })
    }
    if (!fines) {
        throw new ApiError(400, "No fines found");
    }
    res.status(200).json(new ApiResponse(200, "Fines fetched successfully", { fines }));
})

const finePayment = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const fine = await Fine.findByIdAndUpdate(id, { status: true, paidOn:new Date() }, { new: true });
    if (!fine) {
        throw new ApiError(400, "Fine not found");
    }
    res.status(200).json(new ApiResponse(200, "Fine paid successfully", { fine }));
})

export { createFine, getAllFines,finePayment  };