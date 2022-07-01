import express from "express";
import path from "path";
import hbs from "hbs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//paths
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates//partials");

// setting the configurations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Page",
    name: "Aman Misra",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Aman Misra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Aman Misra",
  });
});

app.get("/weather", (req, res) => {
  const input = req.query.address;
  if (!input) {
    return res.send({
      error: "Please provide address to view the result",
    });
  }

  geocode(input, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      const result = forecastData.current;
      res.send({
        Location: "Location: " + forecastData.location.name,
        Weather:
          "Weather : " +
          result.condition.text +
          " with " +
          result.temp_c +
          " degree celcius and " +
          result.wind_kph +
          " kph wind speed",
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error Page",
    name: "Aman Misra",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error Page",
    name: "Aman Misra",
    error: "404: Page does not exist",
  });
});

app.listen(3001, () => {
  console.log("Port 3001 is up and running");
});
