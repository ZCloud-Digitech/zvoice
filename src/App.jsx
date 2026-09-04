import useScrollReveal from './lib/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CallFlow from './components/CallFlow'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import UseCases from './components/UseCases'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  useScrollReveal()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <CallFlow />
        <Features />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
