import HostelAnnouncement from "../../models/hostelAnnouncementModel.js"
import ApiError from "../../utilities/ApiErrorUtility.js";
import ApiResponse from "../../utilities/ApiResponseUtility.js";
import asyncHandler from "../../utilities/AsyncHandlerUtility.js";



const createHostelAnnouncement = asyncHandler(async (req, res) => {
    const staff = req.user
    const { content } = req.body

    if (!content) {
        return res.status(400).json(new ApiError(400, "Content is required"))
    }
    const hostelAnnouncement = await HostelAnnouncement.create({
        content,
        hostel: staff.hostel
    })
    if (!hostelAnnouncement) {
        return res.status(500).json(new ApiError(500, "Unable to create announcement"))
    }
    return res.status(201).json(new ApiResponse(201, "Announcement created successfully", { hostelAnnouncement }))

})


const getAllHostelAnnouncements = asyncHandler(async (req, res) => {
    const staff = req.user;
    const hostelAnnouncements = await HostelAnnouncement.find({ hostel: staff.hostel }).sort({ createdAt: -1 })
    if (!hostelAnnouncements) {
        return res.status(404).json(new ApiError(404, "No announcements found"))
    }
    return res.status(200).json(new ApiResponse(200, "Announcements fetched successfully", { hostelAnnouncements }))
})


const deleteHostelAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params
    const hostelAnnouncement = await HostelAnnouncement.findByIdAndDelete(id)
    if (!hostelAnnouncement) {
        return res.status(404).json(new ApiError(404, "No announcement found"))
    }
    return res.status(200).json(new ApiResponse(200, "Announcement deleted successfully", { hostelAnnouncement }))
})



export { createHostelAnnouncement, getAllHostelAnnouncements, deleteHostelAnnouncement }