const express = require("express");
const mongoose = require("mongoose");
const app = express();
const shortUrl = require("./models/shortUrl");
const PORT = 5000;
mongoose.connect("mongodb://localhost/urlShortner");
const cors = require('cors');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  const urls =  await shortUrl.find();
  res.render("index", {urls:urls});
});

app.get('/:shortId', async (req, res)=> {
  const url = await shortUrl.findOne({short : req.params.shortId});
  if(!url) return res.sendStatus(404);
  url.clicks++
  url.save();
  res.redirect(url.full);
})

app.post("/shorturls", async (req, res) => {
  const url = await shortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});
app.listen(PORT, () => {
  console.log(`app is listening on port :${PORT}`);
});
