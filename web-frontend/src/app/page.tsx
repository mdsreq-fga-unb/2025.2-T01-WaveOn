import "@/styles/app-css/home.css";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";

export default function HomePage() {
  return (
    <main className="home-root">
      <NavBar />
      <Hero />

      <AboutSection />

      <ServicesSection />
    </main>
  );
}
