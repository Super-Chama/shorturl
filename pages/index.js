import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [shortenUrl, setShortenUrl] = useState(null);

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);

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
    setLoading(false);
  };

  return (
    <div className="App">
      {!shortenUrl ? (
        !loading ? (
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
          <div className="card --flex">
            <Image src="/loader.svg" height={150} width={150} alt="loader" />
          </div>
        )
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
