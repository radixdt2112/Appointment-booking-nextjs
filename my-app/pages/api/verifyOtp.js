// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from '../../middleware';
import nc from "next-connect";
const UserModel = require("../../models/users");
const handler = nc();

handler.post(async (req, res, next) => {
    console.log(req.body);
    const result = await UserModel.find({ email: req.body.email });
    const data = result[0];
    if (data.otp == req.body.otp) {
        const result = await UserModel.findByIdAndUpdate(data.id, { isActive: true }, { new: true });
        res.send(result);
    } else {
        res.status(422).send({ msg: 'invalid otp' });
    }

});

export default connectDB(handler);