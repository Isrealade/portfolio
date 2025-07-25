'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import TerminalInterface from '@/components/TerminalInterface'
import TerminalHint from '@/components/TerminalHint'

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  const handleTerminalToggle = () => {
    setIsTerminalOpen(!isTerminalOpen)
  }

  return (
    <main className="min-h-screen">
      <Navigation onTerminalToggle={handleTerminalToggle} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      
      <TerminalInterface 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)}
      />
      
      <TerminalHint onTerminalOpen={handleTerminalToggle} />
    </main>
  )
}