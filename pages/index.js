import { useState } from "react";

export default function Home() {
  const [shortenUrl, setShortenUrl] = useState(null);

  const submitForm = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/route", {
      body: JSON.stringify({
        url: event.target.url.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    setShortenUrl(`http://${result.host}/${result.hash}`);
  };

  return (
    <div className="App">
      {!shortenUrl ? (
        <form onSubmit={submitForm}>
          <h1>Short It!</h1>
          <p>Enter your URL to get shortned...</p>

          <div className="input-wrapper">
            <input
              id="url"
              name="url"
              type="text"
              pattern="https?://.+"
              placeholder="https://example.com"
              required
            />
          </div>

          <div>
            <button type="submit">Short It!</button>
          </div>
        </form>
      ) : (
        <div className="card">
          <h1>Copy It!</h1>
          <a href={shortenUrl} rel="noreferrer" target="_blank">
            {shortenUrl}
          </a>
        </div>
      )}
    </div>
  );
}
