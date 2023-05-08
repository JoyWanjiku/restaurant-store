/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scenes/home/Home";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./components/Navbar";
import CartMenu from "./components/CartMenu";
import Footer from "./components/Footer.jsx";
import Denied from "./scenes/checkout/Denied";
import ErrorPage from "./scenes/global/ErrorPage";
import { useState } from "react";
import Popup from "./cookies/Popup";

function App() {
  const [showCookiePopup, setShowCookiePopup] = useState(true);

  function handleAcceptCookies() {
    setShowCookiePopup(false);
    localStorage.setItem("AcceptedJoyCookie", "true");
  }

  const hasAcceptedCookiePolicy =
    localStorage.getItem("AcceptedJoyCookie") === "true";

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="checkout/denied" element={<Denied />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <CartMenu />
        {!hasAcceptedCookiePolicy && (
        <Popup onAccept={handleAcceptCookies} />
      )}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
