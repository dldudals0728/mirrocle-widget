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
import Default from "./modules/Default";

/**
 * @todo 심각한 오류: width.moduel.css로 적용할 경우 flex가 안될 뿐 아니라, 동적으로 css style을 다루기 어렵다. -> 모니터 사용으로 변경 필요
 */
function App() {
  const [widgetInfo, setWidgetInfo] = useState({});
  const [isConnect, setIsConnect] = useState(true);

  const loadWidgetsInfo = async () => {
    // "http://mirror-env.eba-pjjtmgim.ap-northeast-2.elasticbeanstalk.com/accountIdx=1/json";
    const url =
      "http://mirror-env.eba-pjjtmgim.ap-northeast-2.elasticbeanstalk.com/mirror/changeuser?serialNum=1a2s3d";
    // let url =
    //   "http://mirror-env.eba-pjjtmgim.ap-northeast-2.elasticbeanstalk.com/user/select";
    // url += `?accountIdx=${"1"}&userIdx=${"5"}`;
    const res = await fetch(url);
    const json = await res.json();
    console.log("useEffect json");
    console.log(json);
    console.log(json.status);
    if (json.status === 200) {
      const convertJson = JSON.parse(json.user_template);
      setIsConnect(true);
      setWidgetInfo(convertJson);
    } else if (json.status === 300) {
      setIsConnect(false);
    } else if (json.status === 500) {
      setIsConnect(true);
    }
  };

  const getAPIKey = async () => {};

  const setWidgetModule = (
    moduleName,
    width,
    height,
    top,
    left,
    attribute = null
  ) => {
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
      module = (
        <Weather
          width={width}
          height={height}
          top={top}
          left={left}
          attribute={attribute}
        />
      );
    } else if (moduleName === "지하철") {
      module = (
        <SeoulMetro
          width={width}
          height={height}
          top={top}
          left={left}
          attribute={attribute}
        />
      );
    } else if (moduleName === "뉴스") {
      module = (
        <News
          width={width}
          height={height}
          top={top}
          left={left}
          attribute={attribute}
        />
      );
    } else if (moduleName === "ToDo") {
      module = (
        <ToDos
          width={width}
          height={height}
          top={top}
          left={left}
          attribute={attribute}
        />
      );
    } else if (moduleName === "달력") {
      module = (
        <Calendar
          width={width}
          height={height}
          top={top}
          left={left}
          attribute={attribute}
        />
      );
    }

    return module;
  };

  const polling = async () => {
    console.log("polling 호출!");
    const url =
      "http://mirror-env.eba-pjjtmgim.ap-northeast-2.elasticbeanstalk.com/mirror/changeuser?serialNum=1a2s3d";
    const res = await fetch(url);
    const json = await res.json();
    console.log(json.status);
    if (json.status === 200) {
      setIsConnect(true);
      const convertJson = JSON.parse(json.user_template);
      console.log(convertJson);
      setWidgetInfo((prevWidget) => {
        if (JSON.stringify(prevWidget) != json.user_template) {
          console.log("위젯 업데이트");
          return JSON.parse(json.user_template);
        } else {
          return prevWidget;
        }
      });
    } else if (json.status === 300) {
      setIsConnect(false);
    } else if (json.status === 500) {
      setIsConnect(true);
      setWidgetInfo({});
    }
  };

  useEffect(() => {
    // loadWidgetsInfo();
    const pollingEvent = setInterval(() => polling(), 1000);
    return () => clearInterval(pollingEvent);
  }, []);

  return (
    // Object.keys(widgetInfo).map((key, idx) => {
    <div style={styles.mirrocleContainer}>
      {isConnect ? (
        Object.keys(widgetInfo).length !== 0 ? (
          Object.keys(widgetInfo).map((key, idx) => {
            const moduleName = widgetInfo[key].module_name;
            const moduleWidth = widgetInfo[key].size.width;
            const moduleHeight = widgetInfo[key].size.height;
            const moduleTop = widgetInfo[key].coordinate.y;
            const moduleLeft = widgetInfo[key].coordinate.x;
            const attribute = widgetInfo[key].attribute.attr_member;
            if (moduleName === "날씨") {
              console.log(attribute);
            }
            return (
              <div>
                {setWidgetModule(
                  moduleName,
                  moduleWidth,
                  moduleHeight,
                  moduleTop,
                  moduleLeft,
                  attribute
                )}
              </div>
            );
          })
        ) : (
          <Default />
        )
      ) : (
        <Start />
      )}
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
