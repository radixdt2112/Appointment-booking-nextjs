const ServicesModel = require('../models/services');

export const getServices = async (req, res) => {
    const result = await ServicesModel.find().select('-__v').populate('role', '-__v -createdAt -updatedAt');
    return res.send(result);
};

export const getUserById = async (req, res) => {
    const result = await ServicesModel.findById(req.query.id).select('-__v -createdAt');
    console.log(result);
    if (!result) {
        return res.send('error');
    } else {
        return res.send(result);
    }

};

export const addServices = async (req, res) => {

    const result = await ServicesModel.find({ name: { $in: [req.body.name] } });

    if (result.length == 0) {
        const userObj = new ServicesModel(req.body);
        try {
            const result = await userObj.save();
            res.send(result);
        } catch (ex) {
            console.log(ex);
            res.status(400).send('Error');
        }
    } else {
        res.send({ message: 'service is already added' })
    }
}

export const updateServices = async (req, res) => {
    try {
        const result = await ServicesModel.findByIdAndUpdate(req.query.id, {
            $set: req.body
        }, { new: true });
        res.send(result);

    } catch (e) {
        res.status(400).send("Error");
    }

};

export const deleteServices = async (req, res) => {
    try {
        const result = await ServicesModel.findByIdAndDelete(req.query.id);
        res.send(`User Id:${req.query.id}  Deleted Successfully `);
    } catch {
        return res.send("Not Found Id");
    }
}