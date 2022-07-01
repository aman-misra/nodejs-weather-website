import request from "request";
import { weatherApiKey } from "./constants.js";

export const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}&aqi=no`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to fetch the data", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};
