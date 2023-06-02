import React, { useState, useEffect } from "react";
import "./App.css";

/*eslint-disable*/
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timer, setTimer] = useState(300); 

  const keysToPractice = ['a','s','d','f','j','k','l',';','A','S','D','F','J','K','L'];
   
  // Generate a random combination of the keys
  const randomKeysCombination = () => {
    const shuffledKeys = keysToPractice.sort(() => Math.random() - 0.5);
    return shuffledKeys.join("");
  };

  const [currentKeysCombination, setCurrentKeysCombination] = useState(
    randomKeysCombination()
  );

  const handleInputChange = (e) => {
    if (timer === 0) {
      return;
    }

    const { value } = e.target;
    setInputValue(value);

    if (
      value.charAt(value.length - 1) ===
      currentKeysCombination.charAt(currentKeyIndex)
    ) {
      setKeysPressed(keysPressed + 1);
      setCurrentKeyIndex(currentKeyIndex + 1);
      setCount(count + 1);
    } else {
      setKeysPressed(keysPressed + 1);
    }
  };

  const handleRestart = () => {
    setInputValue("");
    setCurrentKeyIndex(0);
    setKeysPressed(0);
    setAccuracy(0);
    setTimer(300);
    setCount(0);
    setCurrentKeysCombination(randomKeysCombination());
  };

  useEffect(() => {
    if (keysPressed === 0) {
      setAccuracy(0);
    } else {
      const accuracyPercentage = (count / keysPressed) * 100;
      setAccuracy(accuracyPercentage.toFixed(2));
    }
  }, [count, currentKeyIndex, keysPressed]);

  useEffect(() => {
    let countdown;

    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 0) {
            clearInterval(countdown);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  useEffect(() => {
    if (currentKeyIndex === currentKeysCombination.length) {
      setCurrentKeyIndex(0);
      setCurrentKeysCombination(randomKeysCombination());
    }
  }, [currentKeyIndex, currentKeysCombination]);

  useEffect(() => {
    if (timer === 0) {
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculateWPM = () => {
    if (timer === 0) {
      const minutes = 5; 
      const wpm = Math.round(keysPressed / minutes);
      return wpm;
    }
    return 0;
  };
  
  return (
    <div className="typing-practice">
      <h1>Touch Typing Practice</h1>
      <h2>Master the Keyboard: ASDFJKL;</h2>
      <div className="timer">
        <span className="clock-icon">&#x23F0;</span> Time Remaining:{" "}
        {formatTime(timer)}
      </div>

      <div>
        <h3>Start typing the displayed key.</h3>
      </div>
      <div className="highlighted-key">
        <div className="key-box">{currentKeysCombination[currentKeyIndex]}</div>
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
        disabled={timer === 0} 
        className={inputValue ? "bold" : ""}
        placeholder="Type here"
      />
      <div className="statistics">
        <div className="statistics-item">Keys Pressed: {keysPressed}</div>
        <div className="statistics-item">Accuracy: {accuracy}%</div>
        <div className="statistics-item">WPM: {timer === 0 ? calculateWPM() : 0}</div> 
      </div>

      <button className="restart-button" onClick={handleRestart}>
        Restart Test
      </button>
      <br />
      <br />
      {timer === 0 && (
        <div className="time-over-message">
          Time over!  Click Restart Test to start again.
        </div>
      )}
      <footer className="footer">
        Made with <span className="heart">&hearts;</span> by Neeraj
      </footer>
    </div>
    
  );
};

export default App;

