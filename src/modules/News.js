import { useState, useEffect } from "react";
import "./News.css";
import axios from "axios";
import { IP_ADDRESS } from "./IPAddress";

const News = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState(null);
  const [category, setCategory] = useState("");

  const {
    width: widgetWidth,
    height: widgetHeight,
    top: positiontop,
    left: positionleft,
    attribute,
  } = props;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const getAPIKey = async () => {
    let url = IP_ADDRESS + "/api/select";
    url += `?name=news`;
    const res = await fetch(url);
    const json = await res.json();
    return json.api_key;
  };

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  useEffect(() => setCategory(attribute.name), [attribute]);

  useEffect(() => {
    setCurrentSlide(0);
    // async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      try {
        const API = await getAPIKey();
        const query = category === "all" ? "" : `&category=${category}`;
        const url = `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API}`;
        const response = await axios.get(url);
        // const response = await fetch(url);
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [category]);

  const slideLength = 20;
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }
  return (
    <div
      style={{
        left: `${positionleft * 20}%`,
        top: `${positiontop * 10}%`,
        width: `80%`,
        height: `${widgetHeight * 10}%`,
        position: "absolute",
        // border: "white solid 2px",
        // borderRadius: "10px",
      }}
    >
      {articles &&
        articles.map((articles, index) => {
          return (
            <div
              className={index === currentSlide ? "current" : "slide"}
              key={index}
            >
              {index === currentSlide && (
                <div className="content">
                  <img src={articles.urlToImage} alt="thumbnail" />
                  <div>
                    <h3
                      style={{
                        border: "white 2px solid",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    >
                      {articles.title}
                    </h3>
                    <p>{articles.description}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default News;
