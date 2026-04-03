import React from "react";
import Hero from "../components/Hero";
import ExploreCategories from "../components/Explore";
import PopularTours from "../components/PopularTours";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <ExploreCategories />
      <PopularTours />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
