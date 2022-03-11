const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.models.services || mongoose.model("services", ServicesSchema);