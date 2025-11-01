import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //file gets the files passed down
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); //should be change so as to ot overwrite
    },
}); // returns filename

export const upload = multer({
    storage,
});
