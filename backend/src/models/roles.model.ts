import mongoose, { Schema, Document } from "mongoose";

export enum RoleName {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

export interface Roles extends Document{
    roleName: RoleName;
    roleDescription: string;
}

const RoleSchema: Schema<Roles> = new Schema({
    roleName: {
        type: String,
        required: true,
        enum: Object.values(RoleName),
        unique: true,
    },
    roleDescription: {
        type: String,
    }
})


const RolesModel = (mongoose.models.Roles as mongoose.Model<Roles>)
    || mongoose.model<Roles>("Roles", RoleSchema);

export default RolesModel;