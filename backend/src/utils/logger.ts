import { createLogger, transports, format, LogEntry } from 'winston';

const { combine, timestamp, printf, colorize } = format;

interface LogMessage extends LogEntry{
    timestamp: string;
    level: string;
    message: string;
    [key: string]: any;
}

const customFormat = printf((info: LogEntry) => {
    const { timestamp, level, message, ...metadata } = info as LogMessage;
    return `${timestamp} [${level}]: ${message} ${
        Object.keys(metadata).length ? JSON.stringify(metadata, null, 2) : ''
    }`;
});

const logger = createLogger({
    level: 'debug', // Log all levels
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' })
    ]
});

export default logger;
