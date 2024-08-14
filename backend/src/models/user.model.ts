import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    username: string;
    emailAddress: string;
    contactNumber: string;
    dateOfBirth?: Date;
    password: string;
    avatar?: string;
    verificationToken: string;
    tokenExpiry: Date;
    isVerified: boolean;
    address: mongoose.Types.ObjectId;
    subscription: mongoose.Types.ObjectId;
    roles: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    verificationToken: {
        type: String
    },
    tokenExpiry: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: "Subscription"
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Roles"
    }]
}, {timestamps: true})

const UserModel = (mongoose.models.User as mongoose.Model<User>)
    || mongoose.model<User>("User", UserSchema);

export default UserModel;