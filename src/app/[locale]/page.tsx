import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoreMessage from "@/components/CoreMessage";
import ThreePillars from "@/components/ThreePillars";
import Services from "@/components/Services";
import AIAdvisor from "@/components/AIAdvisor";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CoreMessage />
        <ThreePillars />
        <Services />
        <AIAdvisor />
        <CTASection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
