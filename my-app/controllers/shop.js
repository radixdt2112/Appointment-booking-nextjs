const ShopModel = require('../models/shops');

export const getShops = async (req, res) => {
    const result = await ShopModel.find();
    if (result.length == 0) {
        res.status(404).send({ msg: 'Shops not found' });
    } else
        return res.send(result);
};

export const getShopById = async (req, res) => {
    const result = await ShopModel.findById(req.query.id);
    console.log(result);
    if (!result) {
        return res.status(400).send({ msg: 'error' });
    } else {
        return res.send(result);
    }

};

export const addShop = async (req, res) => {
    console.log(req.body);
    const shopObj = new ShopModel(req.body);
    try {
        const result = await shopObj.save();
        res.status(200).send(result);
    } catch (ex) {
        res.status(500).send({ msg: 'something went wrong' });
    }
}

export const updateShop = async (req, res) => {
    try {
        const result = await ShopModel.findByIdAndUpdate(req.query.id, {
            $set: req.body
        }, { new: true });
        res.send(result);

    } catch (e) {
        res.status(400).send({ msg: "Error" });
    }

};

export const deleteShop = async (req, res) => {
    try {
        const result = await ShopModel.findByIdAndDelete(req.query.id);
        res.send(`User Id:${req.query.id}  Deleted Successfully `);
    } catch {
        return res.status(404).send({ msg: "Not Found Id" });
    }
}

