// import styles from "./App.css";
import AnalogClock from "./modules/AnalogClock";
import DigitalClock from "./modules/DigitalClock";
import Start from "./modules/Start";
import ToDos from "./modules/ToDos";
import Weather from "./modules/Weather";

/**
 * @todo 심각한 오류: widget.moduel.css로 적용할 경우 flex가 안될 뿐 아니라, 동적으로 css style을 다루기 어렵다. -> 모니터 사용으로 변경 필요
 */
function App() {
  return (
    <div style={styles.mirrocleContainer}>
      {/* <Start /> */}
      <AnalogClock />
      <DigitalClock />
      <Weather />
      <ToDos />
    </div>
  );
}

const styles = {
  mirrocleContainer: {
    display: "flex",
    flexDirection: "row",
    width: 500,
    height: 500,
  },
};

export default App;
