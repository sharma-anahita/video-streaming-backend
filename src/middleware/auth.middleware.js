//verfies if user exists or not
import jwt from 'jsonwebtoken'
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.models.js';

export const verifyJWT = asyncHandler((req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ",""); //for mobile applications use header
        if(!token) {
            throw new ApiError(401,"Unauthorized request");
        }
        const decodeTokenInfo = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET); //gives decoded info from the token
        const user = User.findById(decodeTokenInfo._id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401,"Invalid Access token");
        }
        //now we have this user ,user has been verified
        req.user = user; //will give req the access of user info
        next(); //now it will run the next function or meathod to be ran
    } catch (error) {
        throw new ApiError(401,error?.message|| 
            "Invalid access token"
        )
    }
});
