import Menu from "./Menu";
import HeroSection from "./HeroSection";
import scrollTop from "./scrollToTop";
import { useEffect } from "react";

function Home() {
    useEffect(()=>{
      scrollTop()
    }, []);
  return (
    <div className="home">
      <HeroSection />
      <Menu />
    </div>
  );
}

export default Home;