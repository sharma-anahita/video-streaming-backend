import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs"; //by default with node

cloudinary.config({
    secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload it on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log(
            "File has been uploaded successfully on cloudinary",
            // response
        );
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log("Couldn't upload the file on cloudinary");
        fs.unlinkSync(localFilePath); //remove the locally saved file after upload failure
        return null;
    }
};

// Log the configuration
console.log(cloudinary.config());

export { uploadOnCloudinary };
