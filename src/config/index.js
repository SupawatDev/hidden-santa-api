
export default {
    server:{
        port:process.env.port || 3000
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
    }
};