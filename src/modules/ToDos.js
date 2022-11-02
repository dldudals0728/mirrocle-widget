import { useEffect, useState } from "react";
import styles from "./ToDos.module.css";

function ToDos(props) {
  const [toDos, setToDos] = useState([]);
  const {
    width: widgetWidth,
    height: widgetHeight,
    top: positiontop,
    left: positionleft,
    attribute,
  } = props;

  useEffect(() => {
    const urgentNotComplateToDos = [];
    const notUrgentNotComplateToDos = [];
    const urgentComplateToDos = [];
    const notUrgentComplateToDos = [];

    Object.keys(attribute.toDos).forEach((key) => {
      if (attribute.toDos[key].isUrgent && !attribute.toDos[key].isCompleted) {
        urgentNotComplateToDos.push(attribute.toDos[key]);
      } else if (
        !attribute.toDos[key].isUrgent &&
        !attribute.toDos[key].isCompleted
      ) {
        notUrgentNotComplateToDos.push(attribute.toDos[key]);
      } else if (
        attribute.toDos[key].isUrgent &&
        attribute.toDos[key].isCompleted
      ) {
        urgentComplateToDos.push(attribute.toDos[key]);
      } else if (
        !attribute.toDos[key].isUrgent &&
        attribute.toDos[key].isCompleted
      ) {
        notUrgentComplateToDos.push(attribute.toDos[key]);
      }
    });

    let newToDos = urgentNotComplateToDos.concat(notUrgentNotComplateToDos);
    newToDos = newToDos.concat(urgentComplateToDos);
    newToDos = newToDos.concat(notUrgentComplateToDos);

    if (newToDos === []) {
      newToDos.push({
        [new Date.now()]: {
          text: "To Do list가 존재하지 않습니다.",
        },
      });
    }
    setToDos(newToDos);
  }, [attribute]);
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
      {toDos.map((toDo, idx) => (
        <div
          key={idx}
          className={styles.toDo}
          style={{
            borderColor: toDo.isUrgent ? "red" : "inherit",
          }}
        >
          {toDo.text}
        </div>
      ))}
    </div>
  );
}

export default ToDos;
