// src/components/ToastProvider.jsx
import React from 'react';
import { Toaster } from 'react-hot-toast';

function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: '#28a745',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: 'red',
              secondary: 'white',
            },
            style: {
              background: '#dc3545',
              color: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default ToastProvider;
