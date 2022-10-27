import { useEffect, useState } from "react";
import styles from "./DigitalClock.module.css";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function DigitalClock(props) {
  const {
    width: widgetWidth,
    height: widgetHeight,
    top: positiontop,
    left: positionleft,
  } = props;

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState("0");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  const [day, setDay] = useState("");

  useEffect(() => {
    const date = new Date();
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
    setDate(date.getDate());
    setDay(days[date.getDay()]);
    const timer = setInterval(() => updateClock(), 1000);
    return () => clearInterval(timer);
  }, []);

  const updateClock = () => {
    const date = new Date();

    const h = date.getHours();
    const m = date.getMinutes();
    const s =
      date.getSeconds() < 10
        ? `0${date.getSeconds()}`
        : date.getSeconds().toLocaleString();

    setHour((prev) => h);
    setMinute((prev) => m);
    setSecond((prev) => s);
  };

  return (
    <div
      className={styles.container}
      style={{
        left: `${positionleft * 20}%`,
        top: `${positiontop * 10}%`,
        width: `${widgetWidth * 20}%`,
        height: `${widgetHeight * 10}%`,
      }}
    >
      <div className={styles.clockContainer}>
        <div className={styles.clockLeft}>
          <div className={styles.days}>{day}</div>
        </div>
        <div className={styles.clockRight} style={{ width: "90%" }}>
          <div className={styles.date}>
            <span style={{ fontSize: 32 }}>{`${month} / ${date}`}</span>
            <span style={{ fontSize: 18 }}>{year}</span>
          </div>
          <div className={styles.time}>
            <div>
              <span>{`${hour} : ${minute}`}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: 42,
                  marginLeft: 12,
                }}
              >{`${second}`}</span>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default DigitalClock;
