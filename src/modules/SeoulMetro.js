import { useEffect, useState } from "react";
import { API_KEYS } from "../temp/API";
import styles from "./SeoulMetro.module.css";

const subwayOption = {
  "01호선": { key: "1001", color: "#0052A4", description: "1" },
  "02호선": { key: "1002", color: "#009D3E", description: "2" },
  "03호선": { key: "1003", color: "#EF7C1C", description: "3" },
  "04호선": { key: "1004", color: "#00A5DE", description: "4" },
  "05호선": { key: "1005", color: "#996CAC", description: "5" },
  "06호선": { key: "1006", color: "#CD7C2F", description: "6" },
  "07호선": { key: "1007", color: "#BDB092", description: "7" },
  "08호선": { key: "1008", color: "#EA545D", description: "8" },
  "09호선": { key: "1009", color: "#BDB092", description: "9" },
  우이신설경전철: { key: "1092", color: "#B0CE18", description: "우이신설" },
  경춘선: { key: "1067", color: "#0C8E72", description: "경춘" },
  경의선: { key: "1063", color: "#77C4A3", description: "경의중앙" },
  수인분당선: { key: "1075", color: "#F5A200", description: "수인분당" },
  신분당선: { key: "1077", color: "#D4003B", description: "신분당" },
  공항철도: { key: "1065", color: "#0090D2", description: "공항" },

  /** 지원 X */
  // 9901: "신림선",
  // 9902: "경강선",
  // 9903: "서해선",
  // 9904: "인천 도시철도 1호선",
  // 9905: "인천 도시철도 2호선",
  // 9906: "의정부 경전철",
  // 9907: "용인 경전철",
  // 9908: "김포 도시철도",
};

function SeoulMetro(props) {
  // const {subwayNumber} = props;
  const subwayNumber = "02호선";
  const subwayStationName = "사당";
  const [sideStation, setSideStation] = useState({
    startStation: "",
    destStation: "",
    previousStation: "",
    nextStation: "",
  });

  const [leftTime, setLeftTime] = useState([]);
  const [rightTime, setRightTime] = useState([]);

  const getSideStation = (stationRoute) => {
    const sideStation = [];
    const direction = [];
    stationRoute.forEach((value) => {
      const split = value.split(" - ");
      direction.push(
        subwayNumber === "02호선"
          ? `${split[0]}(${split[1].slice(-3, -1)})`
          : split[0]
      );
      sideStation.push(split[1].replace("방면", ""));
    });
    console.log(direction);
    console.log(sideStation);

    const stationInfo = {
      startStation: direction[0],
      destStation: direction[1],
      previousStation: sideStation[0],
      nextStation: sideStation[1],
    };
    setSideStation(stationInfo);
  };

  useEffect(() => {
    const getAPI = async () => {
      /**
       * 지하철 실시간 도착정보 - 서울 데이터
       */
      const API = API_KEYS.seoulSubwayRealTime;
      const url = `http://swopenAPI.seoul.go.kr/api/subway/${API}/json/realtimeStationArrival/0/20/${subwayStationName}`;
      const res = await fetch(url);
      const json = await res.json();
      console.log("========= real time arrival start =========");
      console.log("json:", json);
      console.log("========= real time arrival end =========");
      const filteredList = json.realtimeArrivalList.filter((value) => {
        return value.subwayId === subwayOption[subwayNumber].key;
      });
      console.log("======= 사용 데이터 start =======");
      console.log("현재 선택된 호선:", subwayNumber);
      console.log("현재 선택된 역명:", subwayStationName);
      console.log("결과값 json");
      console.log(filteredList);
      console.log("======= 사용 데이터 end =======");
      const subwayRoute = [];
      const leftTimeList = [];
      const rightTimeList = [];
      filteredList.forEach((value) => {
        let subwayRouteName = "";
        if (subwayNumber === "02호선") {
          subwayRouteName += `${value.trainLineNm}(${value.updnLine})`;
        } else {
          subwayRouteName += value.trainLineNm;
        }
        if (!subwayRoute.includes(subwayRouteName)) {
          subwayRoute.push(subwayRouteName);
        }

        if (subwayRouteName === subwayRoute[0]) {
          leftTimeList.push(value.arvlMsg2);
        } else {
          rightTimeList.push(value.arvlMsg2);
        }
      });
      console.log("subwayRoute:", subwayRoute);
      getSideStation(subwayRoute);
      setLeftTime(leftTimeList);
      setRightTime(rightTimeList);
      /**
       * 지하철 노선 역 정보 - 서울 데이터
       */
      // const API = API_KEYS.seoulSubwayStationInfo;
      // const url = `http://openapi.seoul.go.kr:8088/${API}/json/SearchSTNBySubwayLineInfo/1/1000/${" "}/${subwayStationName}`;
      // const res = await fetch(url);
      // const json = await res.json();
      // const subwayInfo = json.SearchSTNBySubwayLineInfo.row;
      // console.log("========= get subway list start =========");
      // console.log(subwayInfo);
      // console.log("========= get subway list end =========");
      // const supportedLineList = subwayInfo.filter((line) => {
      //   return Object.keys(subwayOption).includes(line.LINE_NUM);
      // });
      // console.log(supportedLineList);
      // const sortTest = supportedLineList.sort((before, after) =>
      //   before.FR_CODE < after.FR_CODE ? -1 : 1
      // );
      // console.log(sortTest);

      // const subwayByLine = {
      //   "01호선": [],
      //   "02호선": [],
      //   "03호선": [],
      //   "04호선": [],
      //   "05호선": [],
      //   "06호선": [],
      //   "07호선": [],
      //   "08호선": [],
      //   "09호선": [],
      //   우이신설경전철: [],
      //   경춘선: [],
      //   경의선: [],
      //   수인분당선: [],
      //   신분당선: [],
      //   공항철도: [],
      // };

      // /**
      //  * 외국인 코드로 하니까 어느정도 순서가 있음.
      //  */
      // sortTest.forEach((line) => {
      //   subwayByLine[line.LINE_NUM].push(line);
      // });

      // console.log(subwayByLine);
    };
    getAPI();
  }, []);
  return (
    <div className={styles.seoulSubwayContainer}>
      <div className={styles.lineContainer}>
        <div
          className={styles.sideStationContainer}
          style={{
            backgroundColor: subwayOption[subwayNumber].color,
            justifyContent: "flex-start",
          }}
        >{`< ${sideStation.previousStation}`}</div>
        <div
          className={styles.stationNameContainer}
          style={{
            borderColor: subwayOption[subwayNumber].color,
            backgroundColor: "white",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          {subwayStationName}
        </div>
        <div
          className={styles.sideStationContainer}
          style={{
            backgroundColor: subwayOption[subwayNumber].color,
            justifyContent: "flex-end",
          }}
        >{`${sideStation.nextStation} >`}</div>
      </div>
      <div className={styles.timeContainer}>
        <div className={styles.time} style={{ borderRight: "1px solid gray" }}>
          {leftTime.map((value, idx) => (
            <div key={idx}>
              <span>{sideStation.startStation}</span>
              <span style={{ color: "red", paddingLeft: 12 }}>{value}</span>
            </div>
          ))}
        </div>
        <div className={styles.time}>
          {rightTime.map((value, idx) => (
            <div key={idx}>
              <span>{sideStation.destStation}</span>
              <span style={{ color: "red", paddingLeft: 12 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeoulMetro;
