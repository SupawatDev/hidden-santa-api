var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true});

connection.then(db => {
    console.log(`Successfully connect to db`);
    return db;
}).catch(err => {
    if (err.message.code === "ETIMEOUT") {
        console.log(`attemping to re-establish database connection`);
        mongoose.connect(config.database.uri);

    } else {
        console.log(`Error while attempting to connect to database`);
        console.log(err);
    }
});


module.exports = {mongoose};