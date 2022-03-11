const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    password: { type: String, required: true },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.models.users || mongoose.model("users", userSchema);