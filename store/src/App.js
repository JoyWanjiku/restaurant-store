/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./components/Navbar";
import CartMenu from "./components/CartMenu";
import Footer from "./components/Footer.jsx";
import Denied from "./scenes/checkout/Denied";
import ErrorPage from "./scenes/global/ErrorPage";
import { useEffect, useState } from "react";
import Popup from "./cookies/Popup";

function App() {
  const [showCookiePopup, setShowCookiePopup] = useState(true);

  function handleAcceptCookies() {
    setShowCookiePopup(false);
    localStorage.setItem("AcceptedJoyCookie", "true");
  }

  const hasAcceptedCookiePolicy =
    localStorage.getItem("AcceptedJoyCookie") === "true";

    const ScrollToTop = () => {
      const { pathname } = useLocation();
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
    
      return null;
    };

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
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
