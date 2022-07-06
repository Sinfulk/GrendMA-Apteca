const express = require("express");
const app = express();

// подключаем hbs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.listen(PORT, () => {
  console.log(`server start PORT ${PORT}`);
});
