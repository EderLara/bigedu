const nodeMailer = require('nodemailer');
require('dotenv').config();

const envioCorreo = (req,res)=>{
 let body = req.body;

 let config = nodeMailer.createTransport({
    host:'smtp.gmail.com',
    post:587,
    auth:{
        user:process.env.USER,
        pass:process.env.SECRET
    }
 });

 const options = {
    from:'Bigedu',
    subject: body.asunto,
    to:body.email,
    text:body.mensaje
 };

 config.sendMail(options,(error,result)=>{
    if(error) return res.json({ok:false,msg:error})
    return res.json({
        ok:true,
        msg:result
    })
 })
}

module.exports = {
    envioCorreo
}