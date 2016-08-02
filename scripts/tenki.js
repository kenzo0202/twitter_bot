'use strict'

const http = require("http");
const TENKI_URL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=400040';

module.exports = (cb) =>{
	http.get(TENKI_URL,(res)=>{
		let body = "";
		res.setEncoding('utf-8');
		res.on('data',(chunk)=>{
			body += chunk;
		});

		res.on('end',(res) => {
			res = JSON.parse(body);
			console.log(res);
			let tweet = `${res.forecasts[0].dateLabel}の${res.location.city}は${res.forecasts[0].telop}です。`;
			cb(tweet);
		});
	}).on("error",(e)=>{
		console.log(e.message);
	});
};