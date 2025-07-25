'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useState, useEffect } from 'react'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Default fallback for SSR
  if (!mounted) {
    return (
      <button className="relative p-2 rounded-lg card-bg border border-primary transition-all duration-300">
        <div className="relative w-5 h-5">
          <Moon size={20} className="text-blue-400" />
        </div>
      </button>
    )
  }

  return <ThemeToggleClient />
}

const ThemeToggleClient = () => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg card-bg border border-primary hover:border-primary-500/50 transition-all duration-300 group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun 
          size={20} 
          className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${
            isDark 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        
        {/* Moon Icon */}
        <Moon 
          size={20} 
          className={`absolute inset-0 text-blue-400 transition-all duration-300 ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {isDark ? 'Light mode' : 'Dark mode'}
      </div>
    </button>
  )
}

export default ThemeToggle