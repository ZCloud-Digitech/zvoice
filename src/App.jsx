import { Route, Routes } from 'react-router-dom'
import useScrollReveal from './lib/useScrollReveal'
import useRouteScroll from './lib/useRouteScroll'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import Home from './pages/Home'
import LegalPage from './pages/LegalPage'
import NotFound from './pages/NotFound'

export default function App() {
  useScrollReveal()
  useRouteScroll()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
