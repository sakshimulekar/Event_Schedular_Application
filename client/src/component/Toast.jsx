// components/Toast.js

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file

const Toast = () => {
  return (
    <div>
      <ToastContainer autoClose={2000} position="top-center"/>
    </div>
  );
};

export default Toast;