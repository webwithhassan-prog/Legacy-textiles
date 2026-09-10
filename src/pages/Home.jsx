import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ProcessJourney from "../components/ProcessJourney";
import ServicesPreview from "../components/ServicesPreview";
import WhyUs from "../components/WhyUs";
import CtaBand from "../components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProcessJourney />
      <ServicesPreview />
      <WhyUs />
      <CtaBand />
    </>
  );
}
