import mongoose, {Schema, Document} from "mongoose";


export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    CANCELLED = 'CANCELLED',
}

export interface Subscription extends Document {
    name: string;
    price: number;
    currency: string;
    resolution: string;
    maxDevices: number;
    simultaneousStreams: number;
    duration: number;
    description: string;
    status: SubscriptionStatus;
}

const SubscriptionSchema: Schema<Subscription> = new Schema({
    name: {
        type: String,
        required: true },
    price: {
        type: Number,
        required: true,
    },
    currency: String,
    resolution: {
        type: String,
        required: true
    },
    maxDevices: {
        type: Number,
        required: true
    },
    simultaneousStreams: Number,
    duration: {
        type: Number,
        required: true
    },
    description: Text,
    status: {
        type: String,
        enum: Object.values(SubscriptionStatus),
        required: true
    }
}, {timestamps: true});

const SubscriptionModel =  (mongoose.models.Subscription as mongoose.Model<Subscription>)
    || mongoose.model<Subscription>("Subscription", SubscriptionSchema);

export default SubscriptionModel;