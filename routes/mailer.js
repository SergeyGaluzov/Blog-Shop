const nodemailer = require ('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'gladys.turner@ethereal.email',
        pass: 'NgsAan86n9J8Nzp9aB'
    }
});

const mailer = message => {
    transporter.sendMail(message, (err,info) => {
        if(err) return console.log (err);
        console.log('Email has been sent: ', info)
    })
}

module.exports = mailer;