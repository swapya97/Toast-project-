import React, { useState } from 'react';
import { addToast } from './ToastNotification';

const Component1 = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
    addToast(`Testing ${count + 1}`);
  };

  return (
    <div>
      <h2>First Component</h2>
      <button onClick={handleClick}>Show Toast</button>
    </div>
  );
};

export default Component1;
