import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { StackSection } from './components/sections/StackSection'
import { useCardSpotlight } from './hooks/useCardSpotlight'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  useScrollReveal()
  useCardSpotlight()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      {/* overflow-x-clip: slide-in reveals start off to the side; keep them from widening the page. */}
      <main id="main" className="overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
