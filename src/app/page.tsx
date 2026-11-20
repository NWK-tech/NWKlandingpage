import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/home/sections/HeroSection";
import { ManifestoAboutSection } from "@/features/home/sections/ManifestoAboutSection";
import { SolutionsSection } from "@/features/home/sections/SolutionsSection";
import { MethodologySection } from "@/features/home/sections/MethodologySection";
import { EngineeringShelfSection } from "@/features/home/sections/EngineeringShelfSection";
import { ContactSection } from "@/features/home/sections/ContactSection";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/nwk-logo-horizontal.svg`,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <SolutionsSection />
        <ManifestoAboutSection />
        <MethodologySection />
        <EngineeringShelfSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
