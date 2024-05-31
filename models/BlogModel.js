const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is require"],
    },
    image: {
      type: String,
      required: [true, "image is require"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User", // model name is User in UserModel.js file
      require: [true, "user id is required"],
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;