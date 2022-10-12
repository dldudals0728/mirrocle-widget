import { useEffect, useState } from "react";
import styles from "./Weather.module.css";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

function Weather() {
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState();
  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    /**
     * @todo API KEY는 서버에 넣어 두었다가 가져오는 걸로 구현해야 함
     */
    const API_KEY = "b7091e2ddfd542ffd87c4ad99290c25b";
    const latitude = 37;
    const longitude = 127;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    const convertDailyWeather = convertUTCToTime(json.daily);
    const convertHoulyWeather = convertUTCToTime(json.hourly);
    json.current.dt = new Date(json.current.dt * 1000);
    console.log(json);
    console.log("=====================");
    console.log(convertDailyWeather);
    console.log("=====================");
    console.log(convertHoulyWeather);
    setHourlyWeather(convertHoulyWeather);
  };

  const convertUTCToTime = (weatherData) => {
    const data = weatherData;
    data.map((value) => {
      const convertData = value;
      convertData.dt = new Date(value.dt * 1000);
      return convertData;
    });
    return data;
  };

  return (
    <div>
      <div className={styles.weatherContainer}>
        <div className={styles.topInfo}></div>
        <div className={styles.bottomInfo}></div>
      </div>
    </div>
  );
}

export default Weather;
