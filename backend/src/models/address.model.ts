import mongoose, {Schema, Document} from "mongoose";

export interface Address extends Document {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

const AddressSchema: Schema<Address> = new Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const AddressModel = (mongoose.models.Address as mongoose.Model<Address>)
    || (mongoose.model<Address>("Address", AddressSchema))

export default AddressModel;