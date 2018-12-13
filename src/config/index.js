require('dotenv').config({path:'././env'});


export default {
    server:{
        port:process.env.port || 3000
    },
    logger:{
        host: "",
        port: ""
    },
    email:{
        sender:{
            default:{
                name:'the hidden santa',
                email:'realHiddenSanta@hiddensanta.com'
            }
        },
        sendgrid:{
            secret: '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'
        }
    },
    database:{
        uri: 'mongodb://heroku_8hxp33rt:st12345678@ds125352.mlab.com:25352/heroku_8hxp33rt'
    }
};