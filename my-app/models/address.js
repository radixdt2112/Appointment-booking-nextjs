const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shops', required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
});

module.exports = mongoose.models.address || mongoose.model("address", addressSchema);