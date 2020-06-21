import winston, { createLogger, format, transports } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
const { combine, timestamp, printf } = format;

const customFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
    level: process.env.NODE_ENV ? "debug" : "info",
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customFormat,
    ),
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV ? "debug" : "info"
        }),
        new winstonDaily({
            level: process.env.NODE_ENV ? "error" : "error",
            datePattern: 'YYYYMMDD',
            dirname: './logs',
            filename: `appName_%DATE%.log`,
            maxSize: null,
            maxFiles: 14
        }),
    ],
});

const stream = {
    write: (message:string) => {
      logger.info(message)
    }
}

export { logger, stream };