import styles from "./App.css";
import { useEffect, useState } from "react";
import AnalogClock from "./modules/AnalogClock";
import DigitalClock from "./modules/DigitalClock";
import Weather from "./modules/Weather";
import SeoulMetro from "./modules/SeoulMetro";
import Start from "./modules/Start";
import ToDos from "./modules/ToDos";
import News from "./modules/News";
import Calendar from "./modules/Calendar";

const widgets = {
  analogClock: <AnalogClock />,
  digitalClock: <DigitalClock />,
  weather: <Weather />,
  toDos: <ToDos />,
};

/**
 * @todo 심각한 오류: widget.moduel.css로 적용할 경우 flex가 안될 뿐 아니라, 동적으로 css style을 다루기 어렵다. -> 모니터 사용으로 변경 필요
 */
function App() {
  const [widgetInfo, setWidgetInfo] = useState({});
  const [widgetList, setWidgetList] = useState([]);

  const loadWidgetsInfo = async () => {
    // "http://mirror-env.eba-pjjtmgim.ap-northeast-2.elasticbeanstalk.com/accountIdx=1/json";
    const url =
      "http://mirror-env.eba-pjjtmgim.ap-northeast-2.elasticbeanstalk.com/mirror/changeuser?serialNum=1a2s3d";
    // let url =
    //   "http://mirror-env.eba-pjjtmgim.ap-northeast-2.elasticbeanstalk.com/user/select";
    // url += `?accountIdx=${"1"}&userIdx=${"5"}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.status === 200) {
      console.log("is currect connect");
      setWidgetInfo(JSON.parse(json.user_template));
    }
    console.log(JSON.parse(json.user_template));
    console.log("test function end");
  };

  const getAPIKey = async () => {};

  const setWidgetModule = (moduleName, width, height, top, left) => {
    let module;
    if (moduleName === "아날로그 시계") {
      module = (
        <AnalogClock width={width} height={height} top={top} left={left} />
      );
    } else if (moduleName === "디지털 시계") {
      module = (
        <DigitalClock width={width} height={height} top={top} left={left} />
      );
    } else if (moduleName === "날씨") {
      module = <Weather width={width} height={height} top={top} left={left} />;
    } else if (moduleName === "지하철") {
      module = (
        <SeoulMetro width={width} height={height} top={top} left={left} />
      );
    } else if (moduleName === "뉴스") {
      module = <News width={width} height={height} top={top} left={left} />;
    } else if (moduleName === "ToDo") {
      module = <ToDos width={width} height={height} top={top} left={left} />;
    } else if (moduleName === "달력") {
      module = <Calendar width={width} height={height} top={top} left={left} />;
    }

    return module;
  };

  useEffect(() => {
    loadWidgetsInfo();
  }, []);

  return (
    <div style={styles.mirrocleContainer}>
      {Object.keys(widgetInfo).map((key, idx) => {
        const moduleName = widgetInfo[key].module_name;
        const moduleWidth = widgetInfo[key].size.width;
        const moduleHeight = widgetInfo[key].size.height;
        const moduleTop = widgetInfo[key].coordinate.y;
        const moduleLeft = widgetInfo[key].coordinate.x;
        return setWidgetModule(
          moduleName,
          moduleWidth,
          moduleHeight,
          moduleTop,
          moduleLeft
        );
      })}
    </div>
  );
}

// const styles = {
//   mirrocleContainer: {
//     display: "flex",
//     flexDirection: "row",
//     backgroundColor: "black",
//   },
// };

export default App;
