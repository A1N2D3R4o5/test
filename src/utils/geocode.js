const request = require("request");
const chalk = require("chalk");

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5kcm9tZWFkMTIiLCJhIjoiY2t2MG11MWp2MzI4aTJ1bG5lZDRoN3k2bCJ9.pSm3n2EQJ4dijM_L1yg02g&limit=1`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback(chalk.red.inverse("check internet connection"), undefined);
		} else if (body.features < 1) {
			callback(
				chalk.red.inverse(
					"ubable to find location try again with different search text."
				),
				undefined
			);
		} else {
			callback(undefined, {
				lattitude: body.features[0].bbox[0],
				longtitude: body.features[0].bbox[1],
				location: body.features[0].text,
			});
		}
	});
};

module.exports = geoCode;
