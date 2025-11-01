import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        password: {
            //should always be encrypted
            type: String,
            required: [true, "Password is required"],  
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        refreshToken:{

        },
        accessToken:{

        }
    },
    {
        timestamps: true,
    }
);

//for saving passwords as hashes
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

//for checking the passwords when they are entered
userSchema.methods.checkPassword= async function (password) {
    return await bcrypt.compare(password,this.password)
}

//giving the user a token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        avatar : this.avatar
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id : this._id,
        email : this.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model("User", userSchema);
