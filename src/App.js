import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import hlogo from "./h-logo1.jpg";
import cogLogo from "./Cog.jpg";

function App() {
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    if (!e.target.value.length) {
      return setResults([]);
    }

    try {
      const searchResults = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${e.target.value}`
      );
      setResults(searchResults.data.hits);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  return (
    <div style={{ backgroundColor: "#f6f6ef" }}>
      <header className="App-header" style={{ display: "flex" }}>
        <a href="https://news.ycombinator.com/">
          <img src={hlogo} alt="hacker-news-logo" />
        </a>
        <div style={{ color: "#000", fontSize: "18px", lineHeight: "1" }}>
          <h4 style={{ justifyContent: "right" }}>Search Hacker News</h4>
        </div>
        <form style={{ justifyContent: "center" }}>
          <input
            onChange={handleChange}
            type="search"
            placeholder="Search stories by title, URL, or author"
            style={{
              borderRadius: "0",
              border: "none",
              height: "42px",
              width: "100%",
              boxShadow: "none",
              padding: "16px 144px 16px 54px",
              fontWeight: "300",
              backgroundColor: "#fff",
              marginLeft: "50%",
            }}
          />
        </form>
        <img src={cogLogo} alt="gear-logo" style={{ marginLeft: "25%" }} />
        <div style={{ marginLeft: "15px" }}>
          <a
            href="https://hn.algolia.com/settings"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <h4>Settings</h4>
          </a>
        </div>
      </header>
      {results.map((article, index) => (
        <div key={index}>
          <article
            style={{
              fontSize: "14px",
              padding: "0 16px",
              minHeight: "40px",
              flexWrap: "wrap",
              fontFamily: "Verdana,Geneva,sans-serif",
              marginTop: "15px",
            }}
          >
            <a
              href={`https://news.ycombinator.com/item?id=${article.objectID}`}
              style={{
                color: "#000",
                textDecoration: "none",
              }}
            >
              {article.title}
            </a>{" "}
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "transparent",
                color: "#828282",
                fontSize: "13px",
                wordBreak: "break-all",
                textDecoration: "none",
              }}
            >
              ({article.url})
            </a>
            <p
              style={{
                color: "#696969",
                fontSize: "10.6667px",
                textDecoration: "none",
              }}
            >
              <a
                href={`https://news.ycombinator.com/item?id=${article.objectID}`}
                style={{
                  color: "#696969",
                  fontSize: "10.6667px",
                  textDecoration: "none",
                }}
              >
                {article.points} points
              </a>{" "}
              |{" "}
              <a
                href={`https://news.ycombinator.com/user?id=${article.author}`}
                style={{
                  color: "#696969",
                  fontSize: "10.6667px",
                  textDecoration: "none",
                }}
              >
                {article.author}
              </a>{" "}
              | created at: {article.created_at} |{" "}
              <a
                href={`https://news.ycombinator.com/item?id=${article.objectID}`}
                style={{
                  color: "#696969",
                  fontSize: "10.6667px",
                  textDecoration: "none",
                }}
              >
                {article.num_comments} comments
              </a>
            </p>
          </article>
        </div>
      ))}
    </div>
  );
}

export default App;
