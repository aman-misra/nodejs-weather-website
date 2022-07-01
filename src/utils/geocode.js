import { mapApiKey } from "./constants.js";
import request from "request";

export const geocode = (address, callback) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${mapApiKey}&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to fetch the data", undefined);
    } else if (response.body.results.length == 0) {
      callback("No result exist for the location", undefined);
    } else {
      const result = response.body.results[0];
      callback(undefined, {
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
        location: result.formatted,
      });
    }
  });
};
