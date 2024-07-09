import React from "react";
import "./App.css";
import UserProfile from "./components/UserProfile";

function App() {
  const userId = 1; // Replace with your user ID
  return (
    <div className="App">
      <UserProfile userId={userId} />
    </div>
  );
}

export default App;
