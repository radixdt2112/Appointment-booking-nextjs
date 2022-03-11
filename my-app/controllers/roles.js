const RoleModel = require('../models/roles');

export const getRoles = async (req, res) => {
    const result = await RoleModel.find();
    return res.send(result);
};

export const getRoleById = async (req, res) => {
    const result = await RoleModel.findById(req.query.id).select('name');
    console.log(result);
    if (!result) {
        return res.send('error');
    } else {
        return res.send(result);
    }

};

export const addRole = async (req, res) => {
    console.log(req.body);
    const roleObj = new RoleModel(req.body);
    const result = await roleObj.save();
    res.send(`Role added ${result}`);
}

export const updateRole = async (req, res) => {
    try {
        const result = await RoleModel.findByIdAndUpdate(req.query.id, {
            $set: req.body
        }, { new: true });
        res.send(result);

    } catch (e) {
        res.status(400).send("Error");
    }

};

export const deleteRole = async (req, res) => {
    try {
        const result = await RoleModel.findByIdAndDelete(req.query.id);
        res.send(`User Id:${req.query.id}  Deleted Successfully `);
    } catch {
        return res.send("Not Found Id");
    }
}

