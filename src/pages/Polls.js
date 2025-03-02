import { useState, useEffect } from "react";
import api from "../services/api";
// import "../styles/polls.css";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    api.get("/polls")
      .then((res) => setPolls(res.data))
      .catch((err) => console.error("Error fetching polls:", err));
  }, []);

  return (
    <div className="page-container">
      <h2>Polls</h2>
      {polls.map(poll => (
        <div key={poll.id} className="poll-card">
          <h3>{poll.title}</h3>
          <p>{poll.question}</p>
          {poll.options.map(option => (
            <button key={option.id}>{option.option_text}</button>
          ))}
          {userRole === "admin" && (
            <button className="delete-btn">Delete Poll</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Polls;
