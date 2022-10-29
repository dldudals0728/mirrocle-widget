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
      0: { text: "react" },
      1: { text: "종합프로젝트" },
      2: { text: "과제 제출" },
      3: { text: "독감 접종" },
      4: { text: "운동가기" },
    };
    setToDos(loadToDos);
  }, []);
  return (
    <div
      className={styles.toDosContainer}
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
