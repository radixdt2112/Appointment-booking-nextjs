const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'shops', required: true },
    message: { type: mongoose.Schema.Types.ObjectId, ref: 'services', required: true },
    rating: { type: Number }
}, {
    timestamps: true
});

module.exports = mongoose.models.review || mongoose.model("review", reviewSchema);

