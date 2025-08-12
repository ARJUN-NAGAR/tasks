import { useState } from "react";
import "./App.css";

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "000000".substring(0, 6 - c.length) + c;
}
function getInitials(name) {
  const names = name.trim().split(/\s+/);
  if (names.length === 1) {
    return names[0][0].toUpperCase(); 
  }
  return names[0][0].toUpperCase() + names[1][0].toUpperCase(); 
}

export default function App() {
  const [name, setName] = useState("");
  const [avatars, setAvatars] = useState([]);

  function addAvatar() {
    if (name.trim() === "") return;

    const newNames = name
      .split(/[,]+|\s{2,}|\n+/)
      .map(n => n.trim())
      .filter(n => n !== "");

    setAvatars(prev => [...prev, ...newNames]);
    setName("");
  }

  function deleteAvatar(index) {
    setAvatars(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="app-container">
      <h1>Avatar Generator</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter one or more names"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addAvatar()}
        />
        <button onClick={addAvatar}>Add Avatar(s)</button>
      </div>

      <div className="avatars-container">
        {avatars.length === 0 && <p>No avatars yet. Add some names!</p>}
        {avatars.map((n, i) => {
          const initials = getInitials(n);
          const bgColor = stringToColor(n);
          return (
            <div key={i} className="avatar-wrapper" title={n}>
              <div
                className="avatar"
                style={{ backgroundColor: bgColor }}
              >
                {initials}
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteAvatar(i)}
                aria-label={`Delete avatar for ${n}`}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
