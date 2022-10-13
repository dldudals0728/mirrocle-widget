import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import styles from "./Start.module.css";

function Start() {
  const [serialNumber, setSerialNumber] = useState("");
  useEffect(() => setSerialNumber("ad99290c25b"), []);

  return (
    <div className={styles.QRContainer}>
      <span className={styles.text} style={{ fontSize: "3em" }}>
        환영합니다.
      </span>
      <QRCodeCanvas
        includeMargin={true}
        size={240}
        bgColor="#A0A0A0"
        value={serialNumber}
      />
      <span
        className={styles.text}
        style={{ fontSize: "2em" }}
      >{`S/N: ${serialNumber}`}</span>
      <span className={styles.text}>
        QRCode를 스캔하시거나, S/N를 앱에 입력해주세요.
      </span>
    </div>
  );
}

export default Start;
