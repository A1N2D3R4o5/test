const chalk = require("chalk");
const request = require("request");

const forecast = (longtitude, lattitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=2724175282d07620eba7bbb0269fff4b&query=${lattitude} ${longtitude}&units=f`;
	request({ url, json: true }, (error, {body}) => {
		if (error) {
			callback(chalk.red.inverse("check internet connection"), undefined);
		} else if (body.error) {
			callback(chalk.red.inverse("enter valid address"), undefined);
		} else {
			callback(
				undefined,
				`temperature is ${body.current.temperature} F but feels like ${body.current.feelslike} F.`
			);
		}
	});
};

module.exports = forecast;
