const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3000;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.get("/api/allDates", async (req, res) => {
  const url =
    "https://eu-west-2.aws.data.mongodb-api.com/app/data-yzazcjf/endpoint/data/v1/action/find";
  const requestData = {
    dataSource: "Cluster0",
    database: "calendar",
    collection: "dates",
    filter: {},
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    res.json(json.documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/addDate", async (req, res) => {
  console.log("försöker spara");

  const url =
    "https://eu-west-2.aws.data.mongodb-api.com/app/data-yzazcjf/endpoint/data/v1/action/insertOne";

  const newDate = req.body;

  const requestData = {
    dataSource: "Cluster0",
    database: "calendar",
    collection: "dates",
    document: newDate,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    res.status(201).json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/updateDate/:id", async (req, res) => {
  const url =
    "https://eu-west-2.aws.data.mongodb-api.com/app/data-yzazcjf/endpoint/data/v1/action/updateOne";

  const { id } = req.params;
  const updateFields = req.body;

  const requestData = {
    dataSource: "Cluster0",
    database: "calendar",
    collection: "dates",
    filter: { _id: { $oid: id } }, // Assuming you are using ObjectId for MongoDB _id field
    update: { $set: updateFields },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
