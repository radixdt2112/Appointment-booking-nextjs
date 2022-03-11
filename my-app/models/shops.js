const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'address', required: true },
    img: [{ type: String }],
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop-wise-solts",
        required: true
    }],
    availableSeats: { type: Number, default: 1 },

}, {
    timestamps: true
});


module.exports = mongoose.models.shops || mongoose.model("shops", ServicesSchema);