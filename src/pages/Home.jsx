import { HeroSection } from "../components/HeroSection";
import { BrandBar } from "../components/BrandBar";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { BlogSection } from "../components/BlogSection";
import { AboutUs } from "../components/AboutUs";
import { GetInTouch } from "../components/GetInTouch";
import productsData from "../data/products.json";
import heroPic from "../assets/heroPic.png";

export const Home = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <BrandBar />
      <FeaturedProducts products={productsData.slice(0, 5)} title="Featured Collection" />
      <BlogSection
        title="The Art of Perfumery"
        description="Discover the timeless craft behind every bottle. Our master perfumers blend the finest ingredients to create scents that tell your unique story. Each fragrance is a journey through carefully selected notes, designed to evoke emotions and memories that last a lifetime."
        image={heroPic}
        imagePosition="right"
        buttonText="Learn More"
        onButtonClick={() => console.log('Learn more clicked')}
      />
      <FeaturedProducts products={productsData.slice(5, 10)} title="Best Sellers" />
      <BlogSection
        title="Signature Scents Collection"
        description="Explore our exclusive collection of signature perfumes, crafted for those who appreciate luxury and elegance. From fresh morning notes to deep evening aromas, find the perfect scent that matches your personality and style."
        image={heroPic}
        imagePosition="left"
        buttonText="Explore Collection"
        onButtonClick={() => console.log('Explore clicked')}
      />
      <FeaturedProducts products={productsData.slice(10, 15)} title="New Arrivals" />
      <AboutUs />
      <GetInTouch />
    </div>
  );
}
