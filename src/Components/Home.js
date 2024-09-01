import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [imagePath, setImagePath] = useState(
    "https://cdn.jim-nielsen.com/ios/512/weather-2019-02-07.png"
  );
  const [currTime, setCurrTime] = useState(new Date().toLocaleTimeString());

  const currDate = new Date().toLocaleDateString();
  setInterval(() => {
    setCurrTime(new Date().toLocaleTimeString());
  }, 1000);

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var curr = new Date();
  const day = weekday[curr.getDay()];

  const handleClick = () => {
    console.log("clicked");
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5791a7fd096ec67d0b0c3ad1b54e633e&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          setError("");
          console.log("type: ", res.data.weather[0].main);
          if (res.data.weather[0].main === "Clouds") {
            setImagePath(
              "https://cdn.jim-nielsen.com/ios/512/weather-2019-02-07.png"
            );
          } else if (res.data.weather[0].main === "Clear") {
            setImagePath(
              "https://cdn-icons-png.flaticon.com/512/3222/3222800.png"
            );
          } else if (res.data.weather[0].main === "Rain") {
            setImagePath(
              "https://w7.pngwing.com/pngs/935/733/png-transparent-cloud-weather-rain-rainfall-rainclouds-raincloud-rains-signs-symbols-forecast-thumbnail.png"
            );
          } else if (res.data.weather[0].main === "Drizzle") {
            setImagePath(
              "https://w7.pngwing.com/pngs/759/334/png-transparent-cloud-drizzle-rain-weather-weather-flat-icon.png"
            );
          } else if (res.data.weather[0].main === "Mist") {
            setImagePath(
              "https://cdn-icons-png.flaticon.com/512/1197/1197102.png"
            );
          } else {
            setImagePath(
              "https://cdn.jim-nielsen.com/ios/512/weather-2019-02-07.png"
            );
          }

          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="absolute bg-[url('https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-2381.jpg')] bg-no-repeat bg-cover w-full h-screen flex justify-center p-4 md:p-0">
      <div className="w-full md:w-1/3 mt-12 mb-10 bg-blue-800 rounded-2xl text-center text-white">
        <h1 className="font-bold text-4xl mt-4">Weather Forecast App</h1>
        <div className="flex items-center justify-between p-5 pb-0 m-4 mb-0">
          <input
            className="p-2 m-2 rounded-full  h-15 w-full text-black"
            type="search"
            name="searchName"
            id="searchName"
            placeholder="enter city name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button>
            <img
              className="w-20 h-10 cursor-pointer rounded-full"
              src="https://i.pinimg.com/736x/fa/0e/7b/fa0e7b992eff03c576727e95c746005c.jpg"
              alt="search"
              onClick={handleClick}
            />
          </button>
        </div>
        <div>
          <p className="text-red-500 text-left font-bold mr-3 ml-12">{error}</p>
        </div>

        <div className="m-5">
          <h1 className="font-bold text-3xl">{day}</h1>
          <h2 className="text-2xl"> {currDate}</h2>
          <h3>{currTime}</h3>
        </div>

        <div className="p-5 m-4">
          <img
            className="rounded-xl shadow-xl w-52 h-52 m-auto"
            src={imagePath}
            alt="cloud"
          />
          {data && (
            <>
              <h1 className="p-2 mt-5 font-bold text-4xl">
                {Math.round(data.celcius)}°c
              </h1>
              <h2 className="p-2 m-2 mb-6 text-3xl">{data.name}</h2>
              <div className="flex justify-between gap-4">
                <div className="flex">
                  <img
                    className="h-12"
                    src="https://toppng.com/uploads/preview/humidity-png-11553951584jnjjmw2gwp.png"
                    alt="humidity"
                  />
                  <div className="mx-2 text-xl">
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className="flex">
                  <img
                    className="h-12"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTToZUOU9VuZgTf9YRIbEEgOFvOYw3-b5TrCg&usqp=CAU"
                    alt="wind"
                  />
                  <div className="mx-2 text-xl">
                    <p>{Math.round(data.speed)} km/h</p>
                    <p>Wind</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;