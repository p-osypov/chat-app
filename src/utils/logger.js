import winston from 'winston';
import {PATHS} from "../constants.js";

const defaultSettings = {
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' }
};

const loginLogger = winston.createLogger({
    level: 'info',
    ...defaultSettings,
    transports: [
        new winston.transports.File({ filename: PATHS.logs('login'), level: 'info' }),
    ],
});

const registerLogger = winston.createLogger({
    level: 'info',
    ...defaultSettings,
    transports: [
        new winston.transports.File({ filename: PATHS.logs('register'), level: 'info' }),
    ],
});
const socketLogger = winston.createLogger({
    level: 'info',
    ...defaultSettings,
    transports: [
        new winston.transports.File({ filename: PATHS.logs('socket'), level: 'info' }),
    ],
});

const errorLogger = winston.createLogger({
    level: 'error',
    ...defaultSettings,
    transports: [
        new winston.transports.File({ filename: PATHS.logs('error'), level: 'error' }),
    ],
});

loginLogger.add(new winston.transports.Console({
    level: 'info',
    format: winston.format.simple(),
}));
socketLogger.add(new winston.transports.Console({
    level: 'info',
    format: winston.format.simple(),
}));
registerLogger.add(new winston.transports.Console({
    level: 'info',
    format: winston.format.simple(),
}));
errorLogger.add(new winston.transports.Console({
    level: 'error',
    format: winston.format.simple(),
}));

export { loginLogger, registerLogger, errorLogger, socketLogger };
