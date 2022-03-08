export default function Home() {
  const submitForm = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/register", {
      body: JSON.stringify({
        url: event.target.url.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    // result.user => 'Ada Lovelace'
  };

  return (
    <form onSubmit={submitForm}>
      <h1>Short It!</h1>
      <p>Enter your URL to get shortned...</p>

      <div className="input-wrapper">
        <input
          id="url"
          name="url"
          type="text"
          placeholder="Enter your URL"
          required
        />
      </div>

      <div>
        <button type="submit">Short It!</button>
      </div>
    </form>
  );
}
