import Menu from "./Menu";
import HeroSection from "./HeroSection";
import scrollTop from "./scrollToTop";
import { useEffect } from "react";
import About from "./About";

function Home() {
    useEffect(()=>{
      scrollTop()
    }, []);
  return (
    <div className="home">
      <HeroSection />
      <Menu />
      <About />
    </div>
  );
}

export default Home;