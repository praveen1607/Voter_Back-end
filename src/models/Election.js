"use strict";

const moment = require("moment");

const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

// electionSchema.pre("save", async function (next) {
//   try {
//     if (this.startTime) {
//       const formattedStartTime = moment(this.startTime).format("YYYY-MM-DD");
//       this.startTime = formattedStartTime;
//     }
//     if (this.endTime) {
//       const formattedEndTime = moment(this.endTime).format("YYYY-MM-DD");
//       this.endTime = formattedEndTime;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = mongoose.model("Election", electionSchema);
