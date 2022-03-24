import mongoose from 'mongoose';

const ShopModel = require('../models/shops');
const AddressModel = require("../models/address");
export const getShops = async (req, res) => {

    var regexp = new RegExp("^" + req.query.shopName, 'i');
    // console.log(regexp);
    let result = [];
    if (!!req.query.shopName) {
        result = await ShopModel.find({ isActive: true, name: { $regex: regexp } }).select('-__v ').populate("address", '-__v');
    } else
        result = await ShopModel.find({ isActive: true }).select('-__v ').populate("address", '-__v');
    // console.log(result);
    if (result.length == 0) {
        return res.status(404).send({ msg: 'Shops not found' });
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
    // console.log(req.body);

    const data = req.body;
    // const shopObj = new ShopModel(req.body);
    const address = req.body?.address;
    // console.log(address);
    delete data.address;
    if (!!address) {
        const addressObj = new AddressModel(address);
        try {
            const result = await addressObj.save();
            console.log('address', result);
            if (result) {
                data.address = result.id;
                console.log(data);
                const shopObj = new ShopModel(data);
                try {
                    const shopData = await shopObj.save();
                    res.status(200).send(shopData);
                } catch (ex) {
                    await AddressModel.findByIdAndDelete(result.id);
                    return res.status(500).send({ msg: 'Internal Server Error' });
                }
            }
        } catch (ex) {
            return res.status(500).send({ msg: 'Internal Server Error' });
        }
    }



    // const session = await AddressModel.startSession();
    // session.startTransaction();
    // try {
    //     const opts = { session };

    //     if (!!address) {
    //         const addressObj = new AddressModel(address);
    //         const result = await addressObj.save(opts);
    //         if (result) {
    //             data.address = result.id;
    //             // console.log(data);
    //             const shopObj = new ShopModel(data);

    //             const shopData = await shopObj.save(opts);
    //             await session.commitTransaction();
    //             session.endSession();

    //         }
    //     }
    // } catch (ex) {
    //     console.log(ex);
    //     await session.abortTransaction();
    //     session.endSession();
    //     // throw error;
    // }


    // try {
    //     const result = await shopObj.save();
    //     res.status(200).send(result);
    // } catch (ex) {
    //     res.status(500).send({ msg: 'something went wrong' });
    // }
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

