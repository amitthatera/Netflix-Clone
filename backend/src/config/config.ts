import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, '..', '..', '.env') });

const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`;
dotenv.config({ path: resolve(__dirname, '..', '..', envFile) });

const server = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost'
}

export default server;