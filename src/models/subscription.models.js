import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId,
            ref: "User", //the one subscribing
        },
        channel: {
            type: Schema.Types.ObjectId,
            ref: "User", //the one subscribed to
        },
    },
    {
        timestamps: true,
    }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
