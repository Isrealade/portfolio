'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Terminal } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import Logo from '@/components/Logo'

interface NavigationProps {
  onTerminalToggle?: () => void
}

const Navigation: React.FC<NavigationProps> = ({ onTerminalToggle }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold gradient-text">IA</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="ml-4 flex items-center gap-2">
                <button
                  onClick={onTerminalToggle}
                  className="relative p-2 rounded-lg card-bg border border-primary hover:border-primary-500/50 transition-all duration-300 group animate-pulse hover:animate-none"
                  title="🐧 Try Terminal Mode! Click for Linux-style CLI experience"
                >
                  <Terminal size={20} className="text-primary group-hover:text-primary-400 transition-all duration-200" />
                  
                  {/* Pulse indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                  
                  {/* Enhanced tooltip */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                    <div className="text-center">
                      <div className="text-green-400 font-semibold">🐧 Terminal Mode</div>
                      <div className="text-gray-300">Linux CLI Experience</div>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45"></div>
                  </div>
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onTerminalToggle}
              className="relative p-2 rounded-lg card-bg border border-primary hover:border-primary-500/50 transition-all duration-300 group animate-pulse hover:animate-none"
              title="🐧 Try Terminal Mode! Linux CLI experience"
            >
              <Terminal size={20} className="text-primary group-hover:text-primary-400 transition-all duration-200" />
              
              {/* Pulse indicator for mobile */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-200/95 backdrop-blur-sm rounded-lg mt-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 hover:bg-white/10"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation