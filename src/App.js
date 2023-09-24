import React, { useState, useEffect } from "react";
import { FaTumblr, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });

  const colors = [
    "primary",
    "dark",
    "info",
    "secondary",
    "success",
    "danger",
    "warning",
    "purple",
    "pink",
    "teal",
  ];

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote({ text: data.content, author: data.author });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const getNewQuote = () => {
    fetchRandomQuote();

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.style.backgroundColor = `var(--bs-${randomColor})`;
    document.getElementById("text").style.color = `var(--bs-${randomColor})`;
    document.getElementById("author").style.color = `var(--bs-${randomColor})`;
    document.getElementById(
      "new-quote"
    ).style.backgroundColor = `var(--bs-${randomColor})`;
    document.getElementById(
      "tweet-quote"
    ).style.backgroundColor = `var(--bs-${randomColor})`;
    document.getElementById(
      "tumblr-quote"
    ).style.backgroundColor = `var(--bs-${randomColor})`;
  };

  return (
    <main id="quote-box" className="container text-center mt-5">
      <section className="card p-4 " style={{ backgroundColor: "white" }}>
        <div id="text" className="mb-4">
          <p className="lead">"{quote.text}"</p>
        </div>
        <div id="author">
          <p className="font-italic">- {quote.author}</p>
        </div>
        <div className="btn-group btn-group-justified" id="group">
          <a
            id="tumblr-quote"
            href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
              `${quote.author}: ${quote.text}`
            )}`}
            className="btn btn-success mt-3"
            target="_blank"
            rel="noreferrer"
            style={{ color: "white" }}
          >
            <FaTumblr />
          </a>{" "}
          <button
            id="new-quote"
            className="btn btn-primary mt-3 mr-2"
            onClick={getNewQuote}
            style={{ color: "white", border: "white solid 1px" }}
          >
            New Quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `${quote.text} - ${quote.author}`
            )}`}
            target="_blank"
            className="btn btn-info mt-3"
            rel="noreferrer"
            style={{ color: "white" }}
          >
            <FaTwitter />
          </a>
        </div>
      </section>
    </main>
  );
};

export default App;
