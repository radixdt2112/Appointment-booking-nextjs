const UserModel = require("../models/users");
const jwt = require('jsonwebtoken');

export const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await UserModel.find({ email: email });
    if (result.length === 0) {
        res.send({ msg: "register first" });
    } else {
        const check = await verify(password, result[0].password)
        if (check) {
            const token = jwt.sign({ email: email, role: result.role }, 'AppointmentBooking', { expiresIn: '3d' });
            console.log(result);
            res.send({ name: result[0].name, jwtToken: token, role: result[0].role });
        }
        else {
            res.send('email and password not matched');
        }
    }

}

export const register = async (req, res) => {
    const { password } = req.body;
    const encryptPassword = await hash(password);
    const data = { ...req.body, password: encryptPassword };
    console.log(data);
    const userObj = new UserModel(data);
    try {
        const result = await userObj.save();
        res.send("Register Successfully");
    } catch (ex) {
        res.status(500).send({ msg: 'something wrong' });
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