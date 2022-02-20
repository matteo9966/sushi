const express = require("express");
const app = express();
const notfound = require("./middleware/not-found");
const createTableRoute = require("./routes/createTable");
app.use(express.json());
const storage = require("node-persist");

//inizializzo lo storage:

app.get("/", (req, res) => {
    res.send("<h1>Hello from sushi server</h1>");
});

app.use("/api/v1", createTableRoute);
app.use(notfound);



const port = 6000;

const start = async () => {
  try {
    const myDB = await storage.init({
      dir: "database",
      encoding: "utf8",
      logging: false, // can also be custom logging function
      ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object
      expiredInterval: 5 * 60 * 1000, // every 5 minutes the process will clean-up the expired cache
      // in some cases, you (or some other service) might add non-valid storage files to your
      // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
      forgiveParseErrors: false,
    });
  } catch (error) {
    console.log("could not create storage!");
  }
  app.listen(port, () => console.log("listening on port 6000"));
};

start();
