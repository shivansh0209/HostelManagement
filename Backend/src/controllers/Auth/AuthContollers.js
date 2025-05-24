import asyncHandler from "../../utilities/AsyncHandlerUtility.js";
import ApiError from "../../utilities/ApiErrorUtility.js";
import User from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../../utilities/ApiResponseUtility.js";


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError('email and password are required');
    }
    const userOne = await User.findOne({ email });
    if (!userOne) {
        throw new ApiError('No user foubd with this email');
    }
    const isMatch = await userOne.matchPassword(password);
    if (!isMatch) {
        throw new ApiError('Invalid email or password');
    }
    const refreshToken =await userOne.generateRefreshToken();
    const accessToken =await userOne.generateAccessToken();
    const loggedInUser =await User.findById(userOne._id).select("-password -refreshToken").lean();
    res
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000
    })
    .status(200)
    .json(new ApiResponse(200, "Login successful", { user: loggedInUser }));
}


const verifyAccess = asyncHandler(async (req, res) => {
    // console.log('KJHCHFWEHCFOIUWHIOECFWCHIWECIOW')
    // console.log('KJHCHFWEHCFOIUWHIOECFWCHIWECIOW')

    const token = req.cookies?.accessToken;;
    if (!token) {
        // console.log('KJHCHFWEHCFOIUWHIOECFWCHIWECIOW')
        throw new ApiError('No access token found');
        // console.log('KJHCHFWEHCFOIUWHIOECFWCHIWECIOW')
        // process.exit(1);
    }
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decode._id).select("-password -refreshToken").lean();
    if (!user) {
        throw new ApiError('No user found');
    }
    res.status(200).json(new ApiResponse(200, "Access verified", { user }));
    }
)

const refreshAccessToken = asyncHandler(async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new ApiError("No refrersh token found")

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded._id);
        if (!user) throw new ApiError("Invalid refresh token")

        if (user.refreshToken !== refreshToken) {
            throw new ApiError("Invalid refresh Token")
        }

        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = await user.generateRefreshToken();

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(200)
        .json(new ApiResponse(200, "Login successful", { user }))
    }
)


const changePassword = asyncHandler(async (req, res) => {
    const { emailcheck, oldpassword, newpassword } = req.body;
    if (!emailcheck || !oldpassword || !newpassword) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const student = await User.findOne({ email :emailcheck });
    if (!student) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await student.matchPassword(oldpassword);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    student.password = newpassword;
    await student.save();
    res.status(200).json({ success: true });
})


const logout = asyncHandler(async (req, res) => {
    res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200)
        .json(new ApiResponse(200, "Logout successful"));
}
)


export {
    login,
    verifyAccess,
    refreshAccessToken,
    changePassword,
    logout
}