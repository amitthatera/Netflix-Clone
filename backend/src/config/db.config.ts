import mongoose from "mongoose";
import logger from "../utils/logger";

const DB_URL = process.env.MONGODB_URI;

if (!DB_URL) {
    logger.error("DB_URL environment variable is not set.");
    process.exit(1);
}

const connectToDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        logger.info("Database Already Connected");
        return;
    }

    try {
        await mongoose.connect(DB_URL);
        logger.info("DB Connected Successfully.");
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`DB Connection Error: ${error.message}`, {error});
        } else {
            logger.error("DB Connection Error: An unknown error occurred");
        }
        process.exit(1);
    }
};

export default connectToDB;