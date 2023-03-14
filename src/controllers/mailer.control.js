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
    from:body.email,
    subject: body.asunto,
    to:process.env.USER,
    mensaje:body.mensaje
     
 };

 config.sendMail(options,(error,result)=>{
    if(error) return res.json({ok:false,msg:error})
    return res.status(200).send({
        result, msg: ` este es el correo ${options.from}`
    })
 })
}

module.exports = {
    envioCorreo
}