import mongoose, {Schema, Document} from "mongoose";

export enum PaymentMethod {
    DEBIT_CARD = "DEBIT CARD",
    CREDIT_CARD = "CREDIT CARD",
    NET_BANKING = "NET BANKING",
    UPI = "UPI",
    PHONE_PAY = "PHONE PAY",
    GOOGLE_PAY = "GOOGLE_PAY"
}

export enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

export interface Payment extends Document {
    transactionId: string;
    paymentMethod: PaymentMethod;
    userId: mongoose.Types.ObjectId;
    tokenId: string;
    amount: number;
    currency: string;
    paymentStatus: PaymentStatus;
}

const PaymentSchema: Schema<Payment> = new Schema({
    transactionId: String,
    paymentMethod: {
        type: String,
        required: true,
        enum: Object.values(PaymentMethod),
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tokenId: String,
    amount: Number,
    currency: String,
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING
    }
}, {timestamps: true});

const PaymentModel = (mongoose.models.Payment as mongoose.Model<Payment>)
        || (mongoose.model<Payment>("Payment", PaymentSchema));

export default PaymentModel;

