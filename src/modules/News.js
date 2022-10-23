import { useState, useEffect } from "react";
import "./News.css";
import axios from "axios";

const News = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState(null);
  const slideLength = articles.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
    // async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=kr&apiKey=b762678198a44c338a5c0862b05e5cfb"
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    console.log(articles);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      {articles.map((articles, index) => {
        return (
          <div
            className={index === currentSlide ? "current" : "articles"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <div className="content">
                  <img src={articles.urlToImage} alt="thumbnail" />
                  <div>
                    <h2>{articles.title}</h2>
                    <p>{articles.description}</p>
                  </div>
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
