import { Router } from "express";
import {
    changeCurrentPassword,
    getUser,
    getWatchHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar", //name of feild on front-end
            maxCount: 1, //will only accept one feild in this
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);
//this url will be like "https:localhost:800/api/v1/users/register"
//router.route('/login').post(loginUser)

router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/user-profile").get(verifyJWT, getUser);

//info update routes
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails);
router
    .route("/update-cover-image")
    .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router
    .route("/update-avatar")
    .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router.route("/profile/:username").get(verifyJWT, getUserChannelProfile);

router.route("/watch-history").get(verifyJWT, getWatchHistory);

export default router;
