import Footer from "../../components/Footer";
import Warning from "../../components/warning";
import HeroSection from "./HeroSection";
import StatsBar from "./StatsBar";
import SupportedChains from "./SupportedChains";

// Example usage for Blockchain chains
export default function Home() {

  return (
    <div className="flex flex-col w-full items-center justify-center">
     <HeroSection/>
     <StatsBar/>
    <SupportedChains
    className="flex px-4 items-center justify-center"/>
    <Warning/>
    <Footer/>
    </div>
  );
}