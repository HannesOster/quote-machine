import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });

  const colors = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "secondary",
    "dark",
    "light",
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
  };

  return (
    <main id="quote-box" className="container text-center mt-5">
      <section className="card p-4">
        <div id="text" className="mb-4">
          <p className="lead">{quote.text}</p>
        </div>
        <div id="author">
          <p className="font-italic">- {quote.author}</p>
        </div>
        <button
          id="new-quote"
          className="btn btn-primary mt-3 mr-2"
          onClick={getNewQuote}
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
        >
          Tweet Quote
        </a>
      </section>
    </main>
  );
};

export default App;
