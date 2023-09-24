import React, { useState, useEffect } from "react";
import { FaTumblr, FaTwitter, FaSave } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [savedQuotes, setSavedQuotes] = useState([]);

  const colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "indigo",
    "purple",
    "pink",
    "teal",
    "blue",
    "orange",
    "gray",
    "cyan",
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

  const saveQuote = () => {
    setSavedQuotes([...savedQuotes, quote]);
  };

  return (
    <main id="quote-box" className="container text-center mt-5">
      <section className="card p-4 " style={{ backgroundColor: "white" }}>
        <div id="text" className="mb-4">
          <h3 className="lead">"{quote.text}"</h3>
        </div>
        <div id="author">
          <h5 className="font-italic">- {quote.author}</h5>
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
            style={{ color: "white", border: "white solid 1px" }}
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
            style={{ color: "white", border: "white solid 1px" }}
          >
            <FaTwitter />
          </a>
          <button
            id="save-quote"
            className="btn btn-warning mt-3"
            onClick={saveQuote}
            style={{ color: "white", border: "white solid 1px" }}
          >
            <FaSave />
          </button>
        </div>
      </section>
      {savedQuotes.length > 0 && (
        <section className="card p-4 mt-3" style={{ backgroundColor: "white" }}>
          <h4 style={{ color: "var(--bs-info)" }}>Saved Quotes</h4>
          {savedQuotes.map((savedQuote, index) => (
            <div key={index} className="mb-2">
              <p>"{savedQuote.text}"</p>
              <p className="font-italic">- {savedQuote.author}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default App;
