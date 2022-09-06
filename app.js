const express = require("express");
const app = express();
let port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, function () {
	console.log("App listening on port " + port + "!");
});
