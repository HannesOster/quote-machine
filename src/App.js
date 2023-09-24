import React, { useState, useEffect } from "react";
import { FaTumblr, FaTwitter, FaHeart, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [activeColor, setActiveColor] = useState("primary");

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
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setActiveColor(randomColor);
      document.body.style.backgroundColor = `var(--bs-${randomColor})`;
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const getNewQuote = () => {
    fetchRandomQuote();
  };

  const saveQuote = () => {
    if (!savedQuotes.some((savedQuote) => savedQuote.text === quote.text)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  const removeSavedQuote = (index) => {
    const updatedQuotes = savedQuotes.filter((_, i) => i !== index);
    setSavedQuotes(updatedQuotes);
  };

  return (
    <main id="quote-box" className="container text-center mt-5">
      <section className="quote-card card p-4">
        <div id="text" className="mb-4 quote-text">
          <h3
            className="lead"
            style={{
              color: `var(--bs-${activeColor})`,
            }}
          >
            "{quote.text}"
          </h3>
        </div>
        <div id="author">
          <h5
            className="font-italic quote-text"
            style={{
              color: `var(--bs-${activeColor})`,
            }}
          >
            - {quote.author}
          </h5>
        </div>
        <div className="btn-group btn-group-justified" id="group">
          <a
            id="tumblr-quote"
            href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
              `${quote.author}: ${quote.text}`
            )}`}
            className="btn btn-success mt-3  t-button"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "white",
              border: "white solid 1px",
              backgroundColor: `var(--bs-${activeColor})`,
            }}
          >
            <FaTumblr />
          </a>{" "}
          <button
            id="new-quote"
            className="btn btn-primary mt-3 mr-2  t-button"
            onClick={getNewQuote}
            style={{
              color: "white",
              border: "white solid 1px",
              backgroundColor: `var(--bs-${activeColor})`,
            }}
          >
            New Quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `${quote.text} - ${quote.author}`
            )}`}
            target="_blank"
            className="btn btn-info mt-3  t-button"
            rel="noreferrer"
            style={{
              color: "white",
              border: "white solid 1px",
              backgroundColor: `var(--bs-${activeColor})`,
            }}
          >
            <FaTwitter />
          </a>
          <button
            id="save-quote"
            className="btn btn-warning mt-3  t-button"
            onClick={saveQuote}
            style={{
              color: "white",
              border: "white solid 1px",
              backgroundColor: `var(--bs-${activeColor})`,
            }}
          >
            <FaHeart />
          </button>
        </div>
      </section>
      {savedQuotes.length > 0 && (
        <section className="card p-4 mt-5" style={{ backgroundColor: "white" }}>
          <div className="accordion" id="savedQuotesAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  style={{
                    backgroundColor: `var(--bs-${activeColor})`,
                    color: "white",
                  }}
                >
                  Show Saved Quotes
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#savedQuotesAccordion"
              >
                <div className="accordion-body">
                  {savedQuotes.map((savedQuote, index) => (
                    <div
                      className="d-flex justify-content-between mb-2"
                      key={index}
                    >
                      <div>
                        <p>{savedQuote.text}</p>
                        <p className="font-italic">- {savedQuote.author}</p>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeSavedQuote(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default App;
