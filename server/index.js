const express = require("express");
const app = express();

const mongojs = require("mongojs");
const db = mongojs("mongodb://127.0.0.1:27017/travel", ["records"]);

const bodyParser = require("body-parser");
const qs = require("qs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/records", (req, res) => {
  const options = qs.parse(req.query);
  const sort = options.sort || {};
  const filter = options.filter || {};
  const limit = 4;
  const page = parseInt(options.page);
  const skip = (page - 1) * limit;

  for (i in sort) {
    sort[i] = parseInt(sort[i]);
  }

  db.records.count(filter, (err, totalCount) => {
    if (err) return res.sendStatus(500);
    db.records
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit, (err, data) => {
        if (err) {
          return res.sendStatus(500);
        } else {
          const totalPages = Math.ceil(totalCount / limit);
          const queryString = qs.stringify({ sort, filter }, { encode: false });
          const baseUrl = `/api/records?${queryString}`;

          const links = {
            self: `${baseUrl}&page=${page}`,
            first: `${baseUrl}&page=1`,
            last: `${baseUrl}&page=${totalPages}`,
          };

          if (page > 1) {
            links.prev = `${baseUrl}&page=${page - 1}`;
          }

          if (page < totalPages) {
            links.next = `${baseUrl}&page=${page + 1}`;
          }

          return res.status(200).json({
            meta: { total: data.length, skip, limit, filter, sort, page },
            data,
            links,
          });
        }
      });
  });
});

app.listen(8000, () => {
  console.log("Server running at port 8000...");
});
