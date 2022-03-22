const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'address' },
    img: [{ type: String }],
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop-wise-solts",
    }],
    availableSeats: { type: Number, default: 1 },
    isActive: { type: Boolean, default: false }

}, {
    timestamps: true
});


module.exports = mongoose.models.shops || mongoose.model("shops", shopSchema);