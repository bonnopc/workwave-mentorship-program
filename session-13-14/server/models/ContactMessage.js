const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
        message: { type: String, required: true, trim: true, maxlength: 1000 },
        isDeleted: { type: Boolean, default: false, index: true },
        ipAddress: { type: String, trim: true, default: null },
        userAgent: { type: String, trim: true, default: null }, // Stores user's browser info
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);