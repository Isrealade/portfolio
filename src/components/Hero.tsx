'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, Github, Linkedin, Mail, Download, Terminal } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const roles = [
  'DevOps Engineer',
  'Cloud Engineer',
  'Technical Support Engineer',
  'Infrastructure Automation Specialist'
]

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentRole = roles[currentIndex]
    let charIndex = 0
    let timeouts: NodeJS.Timeout[] = []
    
    const typeText = () => {
      if (charIndex < currentRole.length) {
        setDisplayText(currentRole.slice(0, charIndex + 1))
        charIndex++
        const timeout = setTimeout(typeText, 100)
        timeouts.push(timeout)
      } else {
        const timeout = setTimeout(() => {
          const deleteText = () => {
            if (charIndex > 0) {
              setDisplayText(currentRole.slice(0, charIndex - 1))
              charIndex--
              const deleteTimeout = setTimeout(deleteText, 50)
              timeouts.push(deleteTimeout)
            } else {
              setCurrentIndex((prev) => (prev + 1) % roles.length)
            }
          }
          deleteText()
        }, 2000)
        timeouts.push(timeout)
      }
    }

    typeText()

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [currentIndex])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 section-bg-primary"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary-600/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent-600/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-primary">Hi, I'm</span>
            <span className="block gradient-text">{portfolioData.personal.name}</span>
          </h1>
          
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 h-16 flex items-center justify-center">
            <span className="text-secondary">
              {displayText}
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </span>
          </div>
          
          <p className="text-lg sm:text-xl text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            {portfolioData.personal.tagline}
          </p>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="#contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
            >
              Get In Touch
            </a>
            <a
              href="/Isreal_Adenekan-Resume.pdf"
              download
              className="border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-20">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary hover:text-primary transform hover:scale-110 transition-all duration-300"
            >
              <Github size={28} />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary hover:text-primary transform hover:scale-110 transition-all duration-300"
            >
              <Linkedin size={28} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-tertiary hover:text-primary transform hover:scale-110 transition-all duration-300"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToAbout}
            className="text-tertiary hover:text-primary animate-bounce cursor-pointer transition-colors duration-300"
            aria-label="Scroll to about section"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero