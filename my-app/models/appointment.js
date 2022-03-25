const mongoose = require("mongoose");

const appointMentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shops', required: true },

    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shopServices', required: true }],
    slotTime: { type: mongoose.Schema.Types.ObjectId, ref: 'slotManage', required: true },

    Totalprice: { type: Number }
    //Payment 
}, {
    timestamps: true
});

module.exports = mongoose.models.appointment || mongoose.model("appointment", appointMentSchema);

