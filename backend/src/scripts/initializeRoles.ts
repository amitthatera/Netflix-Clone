import {RoleName} from "../models/roles.model";
import logger from "../utils/logger";
import RolesModel from "../models/roles.model";

const defaultRoles = [
    {roleName: RoleName.ADMIN, roleDescription: 'Administrator with full access'},
    {roleName: RoleName.USER, roleDescription: 'Regular user with basic access'},
    {roleName: RoleName.MANAGER, roleDescription: 'UserModel with manager privileges'},
];

const initializeRoles = async () => {
    try {
        for (const role of defaultRoles) {
            await RolesModel.updateOne(
                {roleName: role.roleName},
                role,
                {upsert: true}
            );
        }
        logger.info('RolesModel have been initialized.');
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Error initializing roles: ${error.message}`, {error});
        } else {
            logger.error("An unknown error occurred");
        }
    }
}

export default initializeRoles;