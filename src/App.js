// import styles from "./App.css";
//import { useEffect, useState } from "react";
//import AnalogClock from "./modules/AnalogClock";
//import DigitalClock from "./modules/DigitalClock";
import Weather from "./modules/Weather";
// import SeoulMetro from "./modules/SeoulMetro";
// import Start from "./modules/Start";
// import ToDos from "./modules/ToDos";
// import News from "./modules/News";
// import Calendar from "./modules/Calendar";

// const widgets = {
//   analogClock: <AnalogClock />,
//   digitalClock: <DigitalClock />,
//   weather: <Weather />,
//   toDos: <ToDos />,
// };

/**
 * @todo 심각한 오류: widget.moduel.css로 적용할 경우 flex가 안될 뿐 아니라, 동적으로 css style을 다루기 어렵다. -> 모니터 사용으로 변경 필요
 */
function App() {
  // const [widgetInfo, setWidgetInfo] = useState({});
  // const [widgetList, setWidgetList] = useState([]);

  // const loadWidgetsInfo = () => {
  //   console.log(window.innerWidth);
  //   console.log(window.innerHeight);
  //   const tempWidget = {
  //     0: {
  //       key: "0",
  //       coordinate: { x: 0, y: 0 },
  //       module_name: "시계",
  //       size: { height: 2, width: 2 },
  //       attribute: {},
  //     },
  //     1: {
  //       key: "1",
  //       coordinate: { x: 4, y: 0 },
  //       module_name: "날씨",
  //       size: { height: 1, width: 1 },
  //       attribute: {
  //         attr_name: "위치 설정",
  //         attr_member: {
  //           latitude: 0,
  //           longitude: 0,
  //           city: "",
  //         },
  //       },
  //     },
  //     2: {
  //       key: "2",
  //       coordinate: { x: 3, y: 4 },
  //       module_name: "교통정보",
  //       size: { height: 3, width: 2 },
  //       attribute: {
  //         attr_name: "위치 설정",
  //       },
  //     },
  //     3: {
  //       key: "3",
  //       coordinate: { x: 0, y: 9 },
  //       module_name: "ToDo",
  //       size: { height: 1, width: 3 },
  //       attribute: {
  //         attr_name: "ToDo list 편집",
  //       },
  //     },
  //   };
  //   setWidgetInfo(() => tempWidget);
  // };

  // const getAPIKey = async () => {};

  // useEffect(() => {
  //   loadWidgetsInfo();
  // }, []);

  // const testFunc = async () => {
  //   console.log("test function start");
  //   const url =
  //     "http://mirror-env.eba-pjjtmgim.ap-northeast-2.elasticbeanstalk.com/user/json";
  //   const res = await fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const text = await res.text();
  //   console.log(text);
  //   console.log("test function end");
  // };
  // testFunc();
  return (
    <div style={styles.mirrocleContainer}>
      {/* <Start /> */}
      {/*<AnalogClock width={1} height={1} top={0} left={1} /> */}
      {/*<DigitalClock width={2} height={3} top={0} left={0} />*/}
      <Weather width={2} height={1} />
      {/* <ToDos /> */}
      {/* <Calendar /> */}
      {/* <News /> */}
    </div>
  );
}

const styles = {
  mirrocleContainer: {
    display: "flex",
    flexDirection: "row",
  },
};

export default App;
