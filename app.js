const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to db....");
    app.listen(port, console.log(`server is listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
