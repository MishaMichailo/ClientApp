import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const Content = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";
  const isRegistrationPage = location.pathname === "/registration";

  const loginContent = (
    <div>
      <div className="infoPage">
        <h2>Simple and fast URL shortener!</h2>
        <p>
          ShortURL allows to shorten long links from Instagram, Facebook,
          YouTube, Twitter, Linked In, WhatsApp, TikTok, blogs and sites. Just
          paste the long URL and click the Shorten URL button. On the next page,
          copy the shortened URL and share it on sites, chat and emails. After
          shortening the URL, check how many clicks it received.
        </p>
        <h2>Shorten, share and track</h2>
        <p>
          Your shortened URLs can be used in publications, documents,
          advertisements, blogs, forums, instant messages, and other locations.
          Track statistics for your business and projects by monitoring the
          number of hits from your URL with our click counter.
        </p>
      </div>
      <div className="idBox">
        <div id="row">
          <div id="column">
            <div className="icon">
              <img src="icon-url.png" alt="Icon" className="aligncenter" />
            </div>
            <h3>Shortened</h3>
            <p>
              ShortURL is easy and fast, enter the long link to get your
              shortened link
            </p>
          </div>
          <div id="column">
            <div className="icon">
              <img src="icon-like.png" alt="Icon" className="aligncenter" />
            </div>
            <h3 className="aligncenter">Easy</h3>
            <p className="aligncenter">
              ShortURL is easy and fast, enter the long link to get your
              shortened link
            </p>
          </div>
          <div id="column">
            <div className="icon">
              <img src="icon-responsive.png" alt="Icon" className="aligncenter" />
            </div>
            <h3 className="aligncenter">Devices</h3>
            <p className="aligncenter">
            Compatible with smartphones, tablets and desktop
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const registrationContent = (
    <div className="registrationPage">
      <img src="icon-registration.png" alt="Icon" className="aligncenter"/>
            <h2>Registration</h2>
            <p>Your password must contain at least one uppercase and one lowercase letter, as well as numbers, without special characters. The size of the password is from 10 to 16.</p>
    </div>
  );

  return (
    <div>
      <App />
      {isLoginPage
        ? loginContent
        : isRegistrationPage
        ? registrationContent
        : null}
    </div>
  );
};

root.render(
  <BrowserRouter basename={baseUrl}>
    <Content />
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
