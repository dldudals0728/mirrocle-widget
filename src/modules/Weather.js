import { useEffect, useState } from "react";
import styles from "./Weather.module.css";
import {
  BsFillCloudFill,
  BsFillBrightnessHighFill,
  BsFillCloudHaze2Fill,
  BsCloudSnowFill,
  BsCloudRainFill,
  BsCloudDrizzleFill,
  BsFillCloudLightningFill,
} from "react-icons/bs";
import { API_KEYS } from "../temp/API";

const icons = {
  Clouds: {
    icon: (
      <BsFillCloudFill
        className={styles.weatherIcon}
        style={{ color: "whitesmoke" }}
      />
    ),
    describe: "흐림",
  },
  Clear: {
    icon: (
      <BsFillBrightnessHighFill
        className={styles.weatherIcon}
        style={{ color: "orange" }}
      />
    ),
    describe: "맑음",
  },
  Atmosphere: {
    icon: <BsFillCloudHaze2Fill className={styles.weatherIcon} />,
    describe: "안개",
  },
  Snow: {
    icon: <BsCloudSnowFill className={styles.weatherIcon} />,
    describe: "눈",
  },
  Rain: {
    icon: <BsCloudRainFill className={styles.weatherIcon} />,
    describe: "비",
  },
  Drizzle: {
    icon: <BsCloudDrizzleFill className={styles.weatherIcon} />,
    describe: "적은 비",
  },
  Thunderstorm: {
    icon: <BsFillCloudLightningFill className={styles.weatherIcon} />,
    describe: "번개",
  },
};

function Weather() {
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    /**
     * @todo API KEY는 서버에 넣어 두었다가 가져오는 걸로 구현해야 함
     */
    const API_KEY = API_KEYS.openweathermap;
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
    setDailyWeather(convertDailyWeather);
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
      {hourlyWeather.length !== 0 && (
        <div className={styles.weatherContainer}>
          <div className={styles.topInfo}>
            <div className={styles.topLeftInfo}>
              <span className={styles.city}>서울특별시</span>
              <span className={styles.temp}>{`${Math.round(
                hourlyWeather[0].feels_like
              )}°`}</span>
            </div>
            <div className={styles.topRightInfo}>
              {icons[hourlyWeather[0].weather[0].main].icon}
              <span>{icons[hourlyWeather[0].weather[0].main].describe}</span>
              <span>{`최고: ${Math.round(
                dailyWeather[0].temp.max
              )}° 최저: ${Math.round(dailyWeather[0].temp.min)}°`}</span>
            </div>
          </div>
          <div className={styles.bottomInfo}>
            {hourlyWeather.map((weather, idx) => {
              if (idx < 6) {
                return (
                  <div className={styles.weatherBox} key={idx}>
                    <span>{`${weather.dt.getHours()}시`}</span>
                    {icons[weather.weather[0].main].icon}
                    <span>{`${Math.round(weather.temp)}°`}</span>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
