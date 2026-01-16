import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Features } from './components/sections/Features'
import { Screenshots } from './components/sections/Screenshots'
import { DownloadSection } from './components/sections/Download'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
