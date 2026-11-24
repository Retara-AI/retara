import Navbar from "@/components/Navbar";
import EyeScroll from "@/components/EyeScroll";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ScreenGallery from "@/components/ScreenGallery";
import Roles from "@/components/Roles";
import Safety from "@/components/Safety";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      <main className="relative bg-white">
        {/* Hero Scroll Engine (Do NOT touch) */}
        <EyeScroll />

        {/* The Problem */}
        <Problem />

        {/* How It Works */}
        <HowItWorks />

        {/* Features */}
        <Features />

        {/* Product Screenshots */}
        <ScreenGallery />

        {/* Who It's For */}
        <Roles />

        {/* Safety & Privacy */}
        <Safety />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
