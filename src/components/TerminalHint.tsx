'use client'

import { useState, useEffect } from 'react'
import { Terminal, X } from 'lucide-react'

interface TerminalHintProps {
  onTerminalOpen: () => void
}

const TerminalHint: React.FC<TerminalHintProps> = ({ onTerminalOpen }) => {
  const [showHint, setShowHint] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user has seen the hint before
    const hasSeenHint = localStorage.getItem('terminal-hint-seen')
    if (!hasSeenHint && !dismissed) {
      // Show hint after 3 seconds
      const timer = setTimeout(() => {
        setShowHint(true)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [dismissed])

  const handleDismiss = () => {
    setShowHint(false)
    setDismissed(true)
    localStorage.setItem('terminal-hint-seen', 'true')
  }

  const handleTryTerminal = () => {
    setShowHint(false)
    setDismissed(true)
    localStorage.setItem('terminal-hint-seen', 'true')
    onTerminalOpen()
  }

  if (!showHint || dismissed) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-lg shadow-2xl border border-green-500/30 animate-bounce">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-green-300 animate-pulse" />
            <h4 className="font-semibold text-sm">Try Terminal Mode!</h4>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        <p className="text-sm text-green-100 mb-3">
          Experience this portfolio like a real DevOps engineer - through the command line! 🐧
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={handleTryTerminal}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex-1"
          >
            Try It Now
          </button>
          <button
            onClick={handleDismiss}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Maybe Later
          </button>
        </div>
        
        {/* Arrow pointing to terminal button */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 transform rotate-45 animate-pulse"></div>
      </div>
    </div>
  )
}

export default TerminalHint