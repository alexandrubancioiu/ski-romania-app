import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAssistant = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5678/webhook/ski-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const text = await res.text();
      let reply;
      try {
        const parsed = JSON.parse(text);
         reply = parsed.choices[0].message.content;
      } catch {
          reply = text;
      }
      setResponse(reply);
    } catch (err) {
      setResponse("Eroare la conectarea cu asistentul.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Ski Romania</h1>
      <h3>Asistent inteligent pentru stațiuni de ski</h3>

      <div className="chat-box">
        <textarea
          rows={3}
          placeholder="Întreabă ceva... ex: Ce stațiuni sunt deschise?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={askAssistant} disabled={loading}>
          {loading ? "Se încarcă..." : "Întreabă"}
        </button>
      </div>

      {response && (
        <div className="response-box">
          <h4>Răspuns asistent:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;