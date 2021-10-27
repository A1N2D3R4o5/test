const express = require("express");
const app = express();
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const port = process.env.PORT || 3000
app.get("*", (req, res, next) => {
	console.log(req.originalUrl);
	next();
});
app.get("", (req, res) => {
	res.send("hello");
});

app.get("/weather", (req, res) => {
	geocode(
		req.query.address,
		(error, { longtitude, lattitude, location } = {}) => {
			if (error) {
				return res.send( {error} );
			}
			forecast(longtitude, lattitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				} else {
					res.send({
						forecastData: forecastData,
						location: location,
						address: req.query.address,
					});
				}
			});
		}
	);
});
app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			Error: "please enter a search term",
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});
app.get("*", (req, res) => {
	res.status(404).send("404 page");
});

app.listen(port, () => {
	console.log(`server is up on port ${port}`);
});
