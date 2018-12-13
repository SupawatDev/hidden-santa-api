const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');

const port = process.env.PORT || 3000;
const api = express();


api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({extended:true}));
api.use(bodyParser.json());

/*api.use(
    jwt({secret:config..jwt.secret}).unless({
        path:[
            '/',
            'auth/'
        ]
    })
);*/



api.listen(config.server.port, err=>{
    if(err){
        logger.error(err);
        process.exit(1);
    }

    logger.info(
        `API is now running on port ${config.server.port}`
    );

});



module.exports = api;