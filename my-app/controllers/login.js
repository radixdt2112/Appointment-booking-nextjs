const UserModel = require("../models/users");
const RoleModel = require("../models/roles");
const jwt = require('jsonwebtoken');

export const login = async (req, res) => {
    const { email, password } = req.body;
    let result = await UserModel.findOne({ email: email, isActive: true }).select('-__v -isActive -otp').populate('role');


    if (!!result) {
        const check = await verify(password, result.password)
        if (check) {
            const token = jwt.sign({ email: email, role: result.role }, 'AppointmentBooking', { expiresIn: '3d' });
            return res
                .send({
                    name: result.name, email: result.email, role: result.role["name"],
                    contactNo: result.contactNo, gender: result.gender, id: result.id, jwtToken: token
                });
        }
        else {
            return res.status(404).send('email and password not matched');
        }

    } else {
        return res.status(404).send({ msg: "register first" });
    }

}

export const register = async (req, res) => {
    const result = await RoleModel.find({ name: "User" });
    if (result.length == 0) {
        return res.status(500).send({ msg: 'something wrong' });
    } else {

        const findUser = await UserModel.find({ email: req.body.email });
        if (findUser.length > 0) {
            return res.status(200).send({ msg: 'already Registered' });
        }

        const { password } = req.body;
        const encryptPassword = await hash(password);
        const data = { ...req.body, role: result[0].id, password: encryptPassword };

        const userObj = new UserModel(data);
        try {
            console.log(data);
            const result = await userObj.save();
            return res.status(200).send({ msg: 'registerd successfully' });
        } catch (ex) {
            return res.status(500).send({ msg: 'something wrong' });
        }
    }


};

const crypto = require("crypto");

export async function hash(password) {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

export async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}