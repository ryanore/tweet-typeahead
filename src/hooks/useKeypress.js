import { useState, useEffect } from 'react';

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = (e) => {
    if (e.key === targetKey) {
      e.preventDefault()
      setKeyPressed(true);
    }
  }

  const upHandler = (e) => {
    if (e.key === targetKey) {
      e.preventDefault()
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress