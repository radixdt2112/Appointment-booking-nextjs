const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'address' },
    img: [{ type: String }],
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "slotManage",
    }],
    //services
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "shopServices",
    }],
    //
    info: { type: String },
    availableSeats: { type: Number, default: 1 },
    isActive: { type: Boolean, default: false }

}, {
    timestamps: true
});


module.exports = mongoose.models.shops || mongoose.model("shops", shopSchema);