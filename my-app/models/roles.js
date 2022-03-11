const mongoose = require("mongoose");

export const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.models.roles || mongoose.model("roles", roleSchema);
