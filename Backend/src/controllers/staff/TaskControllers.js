import Task from "../../models/taskModel.js";
import ApiError from "../../utilities/ApiErrorUtility.js";
import ApiResponse from "../../utilities/ApiResponseUtility.js";
import asyncHandler from "../../utilities/AsyncHandlerUtility.js";

const createTask = asyncHandler(async (req, res) => {
    const staff = req.user;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json(new ApiError(400, "Content is required"));
    }

    const task = await Task.create({
        content,
        hostel: staff.hostel,
        createdBy: staff._id
    });

    if (!task) {
        res.status(500).json(new ApiError(500, "Unable to create task"));
    }

    res.status(201).json(new ApiResponse(201, "Task created successfully", { task }));
});


const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return res.status(404).json(new ApiError(404, "Task not found"));
    }
    res.status(200).json(new ApiResponse(200, "Task deleted successfully", { task }));
}
)

const getAllTasks = asyncHandler(async (req, res) => {
    const user = req.user;
    const tasks = await Task.find({ createdBy : req.user._id}).populate("createdBy");

    if (!tasks) {
        return res.status(404).json(new ApiError(404, "No tasks found"));
    }
    res.status(200).json(new ApiResponse(200, "Tasks fetched successfully", { tasks }));
}
)

export { createTask, getAllTasks, deleteTask };