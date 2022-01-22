const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/api", (req, res) => {
  const date = new Date();

  res.send({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  let { date } = req.params;

  {
    const isNumber = +date;
    if (isNumber) date = isNumber;
  }

  try {
    const dateObject = new Date(date);

    if (isNaN(dateObject.getTime())) throw dateObject;

    res.send({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString(),
    });
  } catch (error) {
    res.send({ error: "Invalid Date" });
  }
});

app.listen(4000, () => {
  console.log("server up");
});
