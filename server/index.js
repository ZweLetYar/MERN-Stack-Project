const express = require("express");
const app = express();

const mongojs = require("mongojs");
const db = mongojs("mongodb://127.0.0.1:27017/travel", ["records"]);

const bodyParser = require("body-parser");
const qs = require("qs");
const { body, param, validationResult } = require("express-validator");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//_________________________________________________________

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

//___________________________________________________________________

app.post(
  "/api/records",
  [
    body("traveler").not().isEmpty(),
    body("destination").not().isEmpty(),
    body("date").not().isEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    db.records.insert(
      {
        traveler: req.body.traveler,
        destination: req.body.destination,
        date: req.body.date,
        duration: req.body.duration,
        transport: req.body.transport,
      },
      function (err, data) {
        if (err) {
          return res.status(500);
        }
        const _id = data._id;
        res.append("Location", "/api/records/" + _id);
        return res.status(201).json({ meta: { _id }, data });
      }
    );
  }
);

//____________________________________________________________________

app.put("/api/records/:id", [param("id").isMongoId()], function (req, res) {
  const _id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  db.records.count(
    {
      _id: mongojs.ObjectId(_id),
    },
    function (err, count) {
      if (count) {
        const record = {
          _id: mongojs.ObjectId(_id),
          ...req.body,
        };
        db.records.save(record, function (err, data) {
          return res.status(200).json({
            meta: { _id },
            data,
          });
        });
      } else {
        db.records.save(req.body, function (err, data) {
          return res.status(201).json({
            meta: { _id: data._id },
            data,
          });
        });
      }
    }
  );
});

//______________________________________________________

app.patch("/api/records/:id", function (req, res) {
  const _id = req.params.id;
  db.records.count(
    {
      _id: mongojs.ObjectId(_id),
    },
    function (err, count) {
      if (count) {
        db.records.update(
          { _id: mongojs.ObjectId(_id) },
          { $set: req.body },
          { multi: false },
          function (err, data) {
            db.records.find(
              {
                _id: mongojs.ObjectId(_id),
              },
              function (err, data) {
                return res.status(200).json({
                  meta: { _id },
                  data,
                });
              }
            );
          }
        );
      } else {
        return res.sendStatus(404);
      }
    }
  );
});

//_______________________________________________________

app.delete("/api/records/:id", function (req, res) {
  const _id = req.params.id;
  db.records.count(
    {
      _id: mongojs.ObjectId(_id),
    },
    function (err, count) {
      if (count) {
        db.records.remove(
          {
            _id: mongojs.ObjectId(_id),
          },
          function (err, data) {
            return res.sendStatus(204);
          }
        );
      } else {
        return res.sendStatus(404);
      }
    }
  );
});

//_______________________________________________________

app.listen(8000, () => {
  console.log("Server running at port 8000...");
});
