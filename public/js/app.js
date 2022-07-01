const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";

  fetch("http://localhost:3001/weather?address=" + search.value).then(
    (response) => {
      const res = response.json();
      res.then((data) => {
        if (data.error) {
          msgOne.textContent = data.error;
        } else {
          msgOne.textContent = data.Location;
          msgTwo.textContent = data.Weather;
        }
      });
    }
  );
});
