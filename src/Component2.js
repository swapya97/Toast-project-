import React, { useState } from 'react';
import { addToast } from './ToastNotification';

const Component2 = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast(message);
    setMessage('');
  };

  return (
    <div>
      <h2>Second Component</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit">Show Toast</button>
      </form>
    </div>
  );
};

export default Component2;
