import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutManifesto from "@/components/AboutManifesto";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <AboutManifesto />
      </main>
    </>
  );
}
