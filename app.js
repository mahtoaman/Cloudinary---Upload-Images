const express = require("express");
const app = express();
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

cloudinary.config({
  cloud_name: "dan26nprl",
  api_key: "545399753645894",
  api_secret: "svhn4f1PHOyAvB72belnn8wnLvM",
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://fynii:NewMo123@cluster0.6ofh0.mongodb.net/Fynii_Database?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDb Connected");
  });

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  user: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", ImageSchema);

app.post("/upload", async (req, res) => {
  const file = req.files.image;
  const saveImages = {};
  saveImages["user"] = "121212121";

  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    if (err) {
      console.log(err);
    } else {
      saveImages.url = result.url;
      const resultData = await Image.
      return res.send(resultData);
    }
  });
  //   return res.status(201).send({ data: result });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
