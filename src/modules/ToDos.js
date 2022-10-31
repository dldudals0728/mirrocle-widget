import { useEffect, useState } from "react";
import styles from "./ToDos.module.css";

function ToDos(props) {
  const [toDos, setToDos] = useState({});
  const {
    width: widgetWidth,
    height: widgetHeight,
    top: positiontop,
    left: positionleft,
  } = props;

  useEffect(() => {
    const loadToDos = {
      0: { text: "내일ㄴ뭐해야ㄴ할까ㄴㅋㅋㅁㄴ" },
      1: { text: "내일 뭐해야 할까 ㅋㅋㅁㄴㅇㅁㄴ" },
      2: { text: "내일 뭐해야 할까 ㅋㅋㅁㄴㅇㅁㄴ" },
      3: { text: "내일 뭐해야 할까 ㅋㅋㅁㄴㅇㅁㄴ" },
      4: { text: "내일 뭐해야 할까 ㅋㅋㅁㄴㅇㅁㄴ" },
    };
    setToDos(loadToDos);
  }, []);
  return (
    <div
      style={{
        left: `${positionleft * 20}%`,
        top: `${positiontop * 10}%`,
        width: `${widgetWidth * 20}%`,
        height: `${widgetHeight * 10}%`,
        position: "absolute",
      }}
    >
      {Object.keys(toDos).map((key) => (
        <div key={key} className={styles.toDo}>
          {toDos[key].text}
        </div>
      ))}
    </div>
  );
}

export default ToDos;
