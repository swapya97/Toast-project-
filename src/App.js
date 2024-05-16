import React from 'react';
import Header from './Header';
import Body from './Body';
import ToastNotification from './ToastNotification';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <ToastNotification />
    </div>
  );
};

export default App;
