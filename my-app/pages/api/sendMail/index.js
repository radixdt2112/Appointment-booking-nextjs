
import { connectDB } from '../../../middleware';
import nc from "next-connect";
const UserModel = require('../../../models/users');
const nodemailer = require("nodemailer");
const handler = nc();
const otpGenerator = (length) => {
    let result = '';
    const characters = '0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

handler.get((req, res, next) => {
    res.send(otpGenerator(4));
});


handler.post(async (req, res, next) => {
    const OTP = otpGenerator(4);
    let transporter = nodemailer.createTransport({
        host: "mail.mailtest.radixweb.net",
        port: 25,
        secure: false, // use SSL
        auth: {
            user: "testdotnet@mailtest.radixweb.net", // generated ethereal user
            pass: "deep70", // enter password here
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    try {
        let info = await transporter.sendMail({
            from: "testdotnet@mailtest.radixweb.net",
            to: req.body.email,
            subject: "Verification",
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                        <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #556cd6;text-decoration:none;font-weight:600">Appointment Booking </a>
                        </div>
                        <p style="font-size:1.1em">Hi,</p>
                        <p>Thank you for choosing our Application. Use the following OTP to complete your Sign Up procedures.</p>
                        <h2 style="background: #556cd6;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                        <p style="font-size:0.9em;">Regards,<br />Appointment Booking</p>
                        <hr style="border:none;border-top:1px solid #eee" />
                        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>Appointment Booking App</p>
                        <p>India</p>
                        </div>
                    </div>
                    </div>`,
        });
        const data = await UserModel.findOneAndUpdate({ email: req.body.email }, { otp: OTP });
        if (!!data) {
            res.status(200).send({ msg: 'Otp send to your mail' });
        }
    } catch (e) {
        res.status(404).send({ msg: 'Unable to send OTP please try again letter' });
    }

});

export default connectDB(handler);