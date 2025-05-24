import LostAndFound from "../../models/lostAndFoundModel.js"
import ApiError from "../../utilities/ApiErrorUtility.js";
import ApiResponse from "../../utilities/ApiResponseUtility.js";
import asyncHandler from "../../utilities/AsyncHandlerUtility.js";



const createLostAndFound = asyncHandler(async (req, res) => {
    const staff = req.user
    const { content } = req.body
    if (!content) {
        return res.status(400).json(new ApiError(400, "Content is required"))
    }
    const lostAndFound = await LostAndFound.create({
        content,
        hostel: staff.hostel
    })
    if (!lostAndFound) {
        return res.status(500).json(new ApiError(500, "Unable to create announcement"))
    }
    return res.status(201).json(new ApiResponse(201, "Announcement created successfully", { lostAndFound }))

})


const getAllLostAndFound = asyncHandler(async (req, res) => {
    const staff = req.user;
    const lostAndFounds = await LostAndFound.find({ hostel: staff.hostel }).sort({ createdAt: -1 })
    if (!lostAndFounds) {
        return res.status(404).json(new ApiError(404, "No lostandfound found"))
    }
    return res.status(200).json(new ApiResponse(200, "Lostandfounds fetched successfully", { lostAndFounds }))
})


const deleteLostAndFound = asyncHandler(async (req, res) => {
    const { id } = req.params
    const lostAndFound = await LostAndFound.findByIdAndDelete(id)
    if (!lostAndFound) {
        return res.status(404).json(new ApiError(404, "No lostandfound found"))
    }
    return res.status(200).json(new ApiResponse(200, "Lostandfound deleted successfully", { lostAndFound }))
})



export { createLostAndFound, getAllLostAndFound, deleteLostAndFound }