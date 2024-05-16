import React, { useState, useEffect, useRef } from 'react';
import './ToastNotification.css';

let toastId = 0;
const ToastNotification = () => {
  const [toasts, setToasts] = useState([]);
  const timerRefs = useRef({});

  useEffect(() => {
    const handleAddToast = (event) => {
      const { detail } = event;
      const id = ++toastId;
      const newToast = { id, message: detail.message, duration: detail.duration || 7000 };
      setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    window.addEventListener('addToast', handleAddToast);

    return () => {
      window.removeEventListener('addToast', handleAddToast);
    };
  }, []);

  useEffect(() => {
    toasts.forEach((toast) => {
      if (!timerRefs.current[toast.id]) {
        timerRefs.current[toast.id] = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
      }
    });
  }, [toasts]);

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    clearTimeout(timerRefs.current[id]);
    delete timerRefs.current[id];
  };

  const handleMouseOver = (id) => {
    clearTimeout(timerRefs.current[id]);
  };

  const handleMouseOut = (id, duration) => {
    timerRefs.current[id] = setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const handleCloseClick = (id) => {
    removeToast(id);
  };

  return (
    <div className="toast-container">
      {toasts.slice(-3).map((toast) => (
        <div
          key={toast.id}
          className="toast"
          onMouseOver={() => handleMouseOver(toast.id)}
          onMouseOut={() => handleMouseOut(toast.id, toast.duration)}
        >
          <span>{toast.message}</span>
          <button onClick={() => handleCloseClick(toast.id)}>x</button>
        </div>
      ))}
    </div>
  );
};

export const addToast = (message, duration) => {
  window.dispatchEvent(new CustomEvent('addToast', { detail: { message, duration } }));
};

export default ToastNotification;
