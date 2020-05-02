const nodemailer = require('nodemailer');
const emailTemplates = require('../_emailTemplates');
const { format } = require('./string');
const config = require('./config');

module.exports.sendEmail = async message => {
    const template = emailTemplates[message.template];
    const subject = format(template.subject, message.context);
    const html = format(template.html, message.context);

    const transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        auth: {
            user: config.SMTP_USERNAME,
            pass: config.SMTP_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: config.SMTP_NOREPLY,
            to: message.to,
            subject,
            html
        });
    } catch (error) {
        console.error(error);
    }
};
