import { useMemo, useState } from "react";

export default function StreamList() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const canAdd = useMemo(() => title.trim().length > 0, [title]);

  function handleSubmit(e) {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;

    const newItem = {
      id: Date.now(),
      title: clean,
      completed: false,
    };

    setItems((prev) => [newItem, ...prev]);
    setTitle(""); // clears input after submit
  }

  function toggleComplete(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditingValue(item.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingValue("");
  }

  function saveEdit(id) {
    const clean = editingValue.trim();
    if (!clean) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: clean } : item
      )
    );
    cancelEdit();
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearAll() {
    setItems([]);
    cancelEdit();
  }

  return (
    <section className="card">
      <h1>StreamList</h1>
      <p className="muted">
        Add movies or shows you want to watch. Items appear below as a list.
      </p>

      <form className="form-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="titleInput">
          Movie or Show Title
        </label>

        <input
          id="titleInput"
          type="text"
          placeholder="Example: The Matrix"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit" disabled={!canAdd}>
          Add
        </button>

        <button type="button" onClick={clearAll} disabled={items.length === 0}>
          Clear
        </button>
      </form>

      <ul className="list">
        {items.length === 0 ? (
          <li className="empty">No items yet.</li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className={`list-item ${item.completed ? "done" : ""}`}
            >
              <div className="left">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                />

                {editingId === item.id ? (
                  <input
                    className="edit-input"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  <span className="title">{item.title}</span>
                )}
              </div>

              <div className="actions">
                {editingId === item.id ? (
                  <>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => saveEdit(item.id)}
                      title="Save"
                    >
                      <span className="material-symbols-outlined">check</span>
                    </button>

                    <button
                      type="button"
                      className="icon-btn"
                      onClick={cancelEdit}
                      title="Cancel"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => startEdit(item)}
                      title="Edit"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>

                    <button
                      type="button"
                      className="icon-btn danger"
                      onClick={() => deleteItem(item.id)}
                      title="Delete"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
