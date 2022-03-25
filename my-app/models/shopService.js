const mongoose = require("mongoose");

const shopServiceSchema = new mongoose.Schema({
    // shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shops', required: true }, //not 
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'services', required: true },
    price: { type: Number, required: true, default: 0 },
    img: [{ type: String }],
    approxTimeToComplete: { type: Number },
}, {
    timestamps: true
});

module.exports = mongoose.models.shopServices || mongoose.model("shopServices", shopServiceSchema);