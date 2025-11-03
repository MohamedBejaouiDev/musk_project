import { HeroSection } from "../components/HeroSection";
import { BrandBar } from "../components/BrandBar";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { BlogSection } from "../components/BlogSection";
import { AboutUs } from "../components/AboutUs";
import { GetInTouch } from "../components/GetInTouch";
import { Link } from "react-router-dom";
import productsData from "../data/products.json";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";

export const Home = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <BrandBar />
      <div id="featured">
        <FeaturedProducts products={productsData.slice(0, 5)} title="Featured Collection" />
      </div>
      <BlogSection
        title="The Art of Perfumery"
        description="Discover the timeless craft behind every bottle. Our master perfumers blend the finest ingredients to create scents that tell your unique story. Each fragrance is a journey through carefully selected notes, designed to evoke emotions and memories that last a lifetime."
        image={blog1}
        imagePosition="right"
        buttonText="Explore Shop"
        onButtonClick={() => window.location.href = '/shop'}
      />
      <FeaturedProducts products={productsData.slice(5, 10)} title="Best Sellers" />
      <BlogSection
        title="Signature Scents Collection"
        description="Explore our exclusive collection of signature perfumes, crafted for those who appreciate luxury and elegance. From fresh morning notes to deep evening aromas, find the perfect scent that matches your personality and style."
        image={blog2}
        imagePosition="left"
        buttonText="Explore Collection"
        onButtonClick={() => console.log('Explore clicked')}
      />
      <FeaturedProducts products={productsData.slice(10, 15)} title="New Arrivals" />
      <div id="about">
        <AboutUs />
      </div>
      <div id="contact">
        <GetInTouch />
      </div>
    </div>
  );
}
