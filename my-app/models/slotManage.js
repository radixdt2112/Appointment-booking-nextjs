const mongoose = require("mongoose");

const slotManageSchema = new mongoose.Schema({

    // shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'shops', required: true },//not
    timeStart: { type: String, required: true },
    timeEnd: { type: String, required: true },
    availableSlots: { type: Number, required: true, default: 0 }

}, {
    timestamps: true
});


module.exports = mongoose.models.slotManage || mongoose.model("slotManage", slotManageSchema);