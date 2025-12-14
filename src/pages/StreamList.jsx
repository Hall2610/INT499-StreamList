import { useState } from "react";

export default function StreamList() {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleaned = title.trim();
    if (!cleaned) return;

    console.log("StreamList Input:", cleaned);

    setTitle("");
  };

  return (
    <section className="card">
      <h1>StreamList</h1>
      <p className="muted">
        Add a movie or show you want to watch. For Week 1, the input is logged to the console.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="movieTitle">
          Movie or Show Title
        </label>

        <div className="row">
          <input
            id="movieTitle"
            type="text"
            value={title}
            placeholder="Example: The Matrix"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </div>
      </form>

      <p className="hint">Open DevTools → Console to see your output.</p>
    </section>
  );
}
