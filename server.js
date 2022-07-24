const express = require("express");
const app = express();
const path = require("path");

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

app.use("/", apiRoutes);
app.use("/", htmlRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
