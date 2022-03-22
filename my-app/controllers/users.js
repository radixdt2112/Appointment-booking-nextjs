const UserModel = require('../models/users');
import { verify, hash } from './login';

export const getUsers = async (req, res) => {
    const result = await UserModel.find().select('-__v').populate('role', '-__v -createdAt -updatedAt');
    return res.send(result);
};

export const getUserById = async (req, res) => {
    // console.log(req.query.id);
    const result = await UserModel.findById(req.query.id).select('-__v -isActive -otp -password ').populate('role');
    // console.log(result);
    if (!result) {
        return res.status(404).send('error');
    } else {
        return res.send({ name: result.name, email: result.email, role: result.role["name"], contactNo: result.contactNo, gender: result.gender, id: result.id });
    }

};

export const addUser = async (req, res) => {

    const result = await UserModel.find({ email: { $in: [req.body.email] } });

    if (result.length == 0) {
        const userObj = new UserModel(req.body);
        try {
            const result = await userObj.save();
            res.send(result);
        } catch (ex) {
            console.log(ex);
            res.status(400).send('Error');
        }
    } else {
        res.send({ message: 'User already exits' })
    }


}

export const updateUser = async (req, res) => {
    try {
        let data = req.body;
        const findUser = await UserModel.findById(req.query.id);
        const chk = await verify(req.body.password, findUser.password);
        if (!chk) {
            const encryptPassword = await hash(req.body.password);
            data = { ...req.body, password: encryptPassword };
        }
        const result = await UserModel.findByIdAndUpdate(req.query.id, {
            $set: data
        }, { new: true });
        res.send(result);

    } catch (e) {
        res.status(400).send("Error");
    }

};

export const deleteUser = async (req, res) => {
    try {
        const result = await UserModel.findByIdAndDelete(req.query.id);
        res.send(`User Id:${req.query.id}  Deleted Successfully `);
    } catch {
        return res.send("Not Found Id");
    }
}