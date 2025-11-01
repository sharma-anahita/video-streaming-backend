import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema ({
    videoURL :{
        type :String,
        required :true
    },
    thumbnailURL :{
        type :String,
        required : true,
    },
    owner:{
        type :Schema.Types.ObjectId,
        ref :"User"
    },
    title:{
        type :String,
        required :true,

    },
    description:{
        type:String,
        minlength : 10,
        required :true,
    },
    duration:{
        type :Number
    },
    views:{
        type :Number,
        default : 0
    },
    isPublished:{ //private or not
        type: Boolean,
        default :true
    },
    

},
{
    timestamps: true
})
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)