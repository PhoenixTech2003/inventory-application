const express = require("express");
const indexRouter = require("./routes/indexRoutes");
require("dotenv").config();
const path = require("node:path");
const PORT = process.env.PORT || 9000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);


app.use((err,res,req)=>{
    res.send('hello there is an error',)
})

app.listen(PORT, () => console.log(`Express App listening on port http://localhost:${PORT}`));
