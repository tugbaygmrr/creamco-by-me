import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductExperience from "@/components/ProductExperience";
import WhyCreamCo from "@/components/WhyCreamCo";
import InstagramFeed from "@/components/InstagramFeed";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <ProductExperience />
      <WhyCreamCo />
      <InstagramFeed />
      <FinalCTA />
    </>
  );
}
