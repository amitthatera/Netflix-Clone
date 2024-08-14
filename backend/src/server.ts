import express from "express";
import cookieParser from "cookie-parser"
import morganMiddleware from "./middleware/morgan.middleware";
import cors from "cors";
import compression from "compression";
import logger from "./utils/logger";
import server from "./config/config";
import connectToDB from "./config/db.config";
import initializeRoles from "./scripts/initializeRoles";
import limiter from "./middleware/rate-limiter.middleware";
import {corsOptions} from "./middleware/cors.middleware";
import {helmetMiddleware} from "./middleware/helmet.middleware";


const application = express();

(async (): Promise<void> => {
    try {
        logger.info('----------------------------------------');
        logger.info("Initializing Configurations...");
        application.use(express.urlencoded({extended: true}));
        application.use(express.json());
        application.use(cookieParser());
        application.use(limiter);
        application.use(cors(corsOptions));
        application.use(helmetMiddleware)
        application.use(compression)
        application.use(morganMiddleware);
        application.use(express.static("public"));

        logger.info('----------------------------------------');
        logger.info("Connecting to DB...");
        await connectToDB();

        logger.info('----------------------------------------');
        logger.info("Initializing roles...");
        await initializeRoles();

        logger.info('----------------------------------------');
        logger.info('Starting Server...');
        application.listen(server.PORT, () => {
            logger.info(`Server started on http://${server.HOST}:${server.PORT}`);
            logger.info('----------------------------------------');
        });

    } catch (error) {
        logger.error("Error during server initialization", error);
        process.exit(1); // Exit process with failure
    }
})();


process.on('SIGINT', () => {
    logger.info("Received SIGINT. Graceful shutdown...");
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info("Received SIGTERM. Graceful shutdown...");
    process.exit(0);
});