import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import AppLaunch from "./AppLaunch";
import reportWebVitals from './reportWebVitals';
const App = lazy(() => import("./routes"));

ReactDOM.render(
  <Suspense fallback={<AppLaunch />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
