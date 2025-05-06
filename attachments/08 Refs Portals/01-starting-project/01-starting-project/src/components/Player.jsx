import React, { useState, useRef } from 'react';

export default function Player() {

  const playerInput = useRef(null);
  const [playerName, setPlayerName] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    const name = playerInput.current.value;
    if (name) {
      setPlayerName(name);
      playerInput.current.value = "";
    }
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerInput}/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
