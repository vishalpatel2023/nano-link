const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    clickHistory: [
      {
        clickedAt: {
          type: Date,
          default: Date.now,
        },

        browser: {
          type: String,
          default: "Unknown",
        },

        referrer: {
          type: String,
          default: "Direct",
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // importantt
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Url", urlSchema);
