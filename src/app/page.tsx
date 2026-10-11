import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutManifesto from "@/components/AboutManifesto";
import CatalogGrid from "@/components/CatalogGrid";
import DossierShowcase from "@/components/DossierShowcase";
import ProcessSteps from "@/components/ProcessSteps";
import FaqSection from "@/components/FaqSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <AboutManifesto />
        <CatalogGrid />
        <DossierShowcase />
        <ProcessSteps />
        <FaqSection />
      </main>
    </>
  );
}
