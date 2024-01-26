import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccess = async (userID) => {
    try {
        const newUser = await User.findOne({ _id: userID });
        const AccessToken = await newUser.generateAccessToken();
        return { AccessToken, newUser };
    } catch (error) {
        throw new Error("Internal Error")
    }
}


const userRegisterController = (asyncHandler(async (req, res) => {
    const { phone_number, priority } = req.body;
    if (phone_number === "") {
        res.status(400).json({
            message: "Field input is empty",
        })
    }
    const findUser = await User.findOne({ phone_number, });
    if (findUser) {
        res.status(200).json({
            message: "User Exist"
        })
    }
    else {
        const user = await User.create(
            {
                phone_number,
            });
        res.status(200).json({
            data: user,
            message: "Signed Up. Moving to Login",
        })
    }
}))

const userLoginController = (asyncHandler(async (req, res) => {
    const { phone_number } = req.body;
    if (phone_number === "") {
        res.status(400).json({
            message: "Enter Phone Number"
        })
    }
    else {
        const user = await User.findOne({ phone_number:phone_number })
        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else {
            const { AccessToken, newUser } = await generateAccess(user._id);
            const options = {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            }
            res.status(200)
                .cookie("accessToken", AccessToken, options)
                .json({
                    "accessToken": AccessToken,
                    user:newUser,
                    message: "Logged In successfull"
                })

        }
    }
}));

export { userRegisterController, userLoginController }