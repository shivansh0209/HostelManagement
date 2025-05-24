import jwt from "jsonwebtoken";
import asyncHandler from "../utilities/AsyncHandlerUtility.js";
import User from "../models/userModel.js";
import ApiError from "../utilities/ApiErrorUtility.js";


const authMiddleware = asyncHandler(async (req, res, next) => {
    try{
        const token = req.cookies?.accessToken;
        
        if(!token){
            throw new ApiError(400,"Unauthorized request");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select("-password -refreshToken");
        if(!user){
            throw new ApiError(400,"Invalid Access Token");
        }
        req.user = user;
        next();
    }
    catch (err){
        console.error("Error in authorization middleware: ", err);
        res.status(401).json({
            statusCode: 401,
            message: "Unauthorized request",
        });
    }


})


export default authMiddleware;