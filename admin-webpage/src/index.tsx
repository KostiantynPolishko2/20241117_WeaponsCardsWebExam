import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'the-new-css-reset';
import reportWebVitals from './reportWebVitals';
import AdminPage from './components/AdminPage/AdminPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AdminPage/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
