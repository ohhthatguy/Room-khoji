const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    secure: "true",
    host: "smtp.gmail.com",
    port: "465",
    auth:{
        user:'thakullabhaskar456@gmail.com',
        pass:'cvdixwnckfjxxqlo'
    }
})

const sendMailFunction = (to, subject, message)=>{
    transporter.sendMail({
        to,
        subject,
        html:message
    },function(error,info){
     if(error){
         console.log(error);
     }else{
         console.log('Email Send ' + info.response);
     }
})
}

module.exports = sendMailFunction;

