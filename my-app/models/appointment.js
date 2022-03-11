const mongoose = require("mongoose");

const appointMentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shops', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'services', required: true },
    price: { type: Number }
}, {
    timestamps: true
});

module.exports = mongoose.models.appointment || mongoose.model("appointment", appointMentSchema);

