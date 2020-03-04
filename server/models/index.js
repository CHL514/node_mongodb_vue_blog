const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongo-exercises", {
  useNewUrlParser: true
});

module.exports = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    price: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now
    },
    isPublished: Boolean
  })
);
