import fs from 'fs';
import ejs from 'ejs';
import sendgrid from '@sendgrid/mail';

import logger from '../logger';
import config from '../../config';

const email = data =>{
    if(!data.type || !data.email){
        return new Promise(reject => {
            const err = 'missing data'
            logger.error(err);
            reject(err);
        })
    }
    return new Promise((resolve,reject)=>{
        var variables = JSON.stringify(
            { receiver: data.email.receiver,
            rules: data.email.rules,
            img: data.email.img}
        );
        sendgrid.setApiKey(config.email.sendgrid.secret);
        if(data.type === "quest"){
            const msg = ejs.render(
                
                fs.readFileSync(__dirname + 'templates/result.ejs','utf16'),variables);
            
                const obj = {
                to:data.email.to,
                from:{
                    name:config.email.sender.default.name,
                    email:config.email.sender.default.email
                },
                subject: "Your new Santa's quest is ready!",
                content:[
                    {type:'text/html',
                     value: msg}
                ]
            };
            sendgrid.send(obj).then(res=>{resolve(res)}).catch(err=>{logger.error(err);reject(err)});
        }

    })



}

export default email;