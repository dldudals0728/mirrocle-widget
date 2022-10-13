import { useEffect, useState } from "react";
import styles from "./AnalogClock.module.css";

const DEG = 6;

function AnalogClock() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  /**
   * setInterval()을 useEffect()를 통해 선언하지 않고 함수 밖에 바로 사용할 경우
   * state가 변경되면서 컴포넌트가 재호출 되는데, 이 때 setInterval()이 또 호출되어 함수의 호출이
   * 상당히 많이 발생했다. => useEffect()로 해결!
   */
  useEffect(() => {
    const timer = setInterval(() => updateClock(), 1000);
    return () => clearInterval(timer);
  });

  const updateClock = () => {
    const date = new Date();
    const h = date.getHours() * 30;
    const m = date.getMinutes() * DEG;
    const s = date.getSeconds() * DEG;

    setHour((prev) => h);
    setMinute((prev) => m);
    setSecond((prev) => s);
  };

  return (
    <div className={styles.clockContainer}>
      <div className={styles.clock}>
        <div
          className={`${styles.hand} ${styles.hour}`}
          style={{ transform: `rotateZ(${hour + minute / 12}deg)` }}
        ></div>
        <div
          className={`${styles.hand} ${styles.minute}`}
          style={{ transform: `rotateZ(${minute}deg)` }}
        ></div>
        <div
          className={`${styles.hand} ${styles.second}`}
          style={{ transform: `rotateZ(${second}deg)` }}
        ></div>
        {/* <div
          style={{
            ...styles.hand,
            ...styles.hour,
            transform: `rotateZ(${hour + minute / 12}deg)`,
          }}
        ></div>
        <div
          style={{
            ...styles.hand,
            ...styles.minute,
            transform: `rotateZ(${minute}deg)`,
          }}
        ></div>
        <div
          style={{
            ...styles.hand,
            ...styles.second,
            transform: `rotateZ(${second}deg)`,
          }}
        ></div> */}
      </div>
    </div>
  );
}

export default AnalogClock;
