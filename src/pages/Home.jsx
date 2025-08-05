import React from "react";
import HeroHome from "../components/home/HeroHome";
import FeaturesBlock from "../components/home/FeacherBlockes";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import CategoryList from "../components/CategoryList";
import EbayLiveSection from "../components/home/EbayLiveSection";

const Home = () => {
  return (
    <main>
      <HeroHome />
      <CategoryList/>
      <EbayLiveSection />
      <FeaturesBlock />
      <Testimonials />
      {/* <Newsletter />   */}
    </main>
  );
};

export default Home;
