import mongoose from 'mongoose';

import config from '../../config';
import logger from '../logger';

mongoose.Promise = global.Promise;

const connection = mongoose.connect(config.database.url);

connection.then(db => {
    logger.info(`Successfully connect to ${config.database.uri} MongoDB cluster in ${config.env} mode.`);
    return db;
}).catch(err => {
    if (err.message.code === "ETIMEOUT") {
        logger.info(`attemping to re-establish database connection`);
        mongoose.connect(config.database.uri);

    } else {
        logger.error(`Error while attempting to connect to database`);
        logger.error(err);
    }
});