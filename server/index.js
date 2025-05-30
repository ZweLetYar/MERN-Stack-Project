const express = require("express");
const app = express();

const mongojs = require("mongojs");
const db = mongojs("mongodb://127.0.0.1:27017/travel", ["records"]);

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/records", (req, res) => {
  db.records.find((err, data) => {
    if (err) {
      return res.sendStatus(500);
    } else {
      return res.status(200).json({
        meta: { total: data.length },
        data,
      });
    }
  });
});

app.listen(8000, () => {
  console.log("Server running at port 8000...");
});
