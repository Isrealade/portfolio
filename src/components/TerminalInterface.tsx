'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react'
import { VirtualFileSystem } from '@/lib/terminal-filesystem'
import { TerminalCommands } from '@/lib/terminal-commands'

interface TerminalInterfaceProps {
  isOpen: boolean
  onClose: () => void
}

interface CommandHistory {
  input: string
  output: string[]
  timestamp: Date
}

const TerminalInterface: React.FC<TerminalInterfaceProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentPath, setCurrentPath] = useState('/home/isreal')
  const [isLoading, setIsLoading] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const fsRef = useRef<VirtualFileSystem | null>(null)
  const commandsRef = useRef<TerminalCommands | null>(null)

  // Initialize filesystem and commands
  useEffect(() => {
    if (!fsRef.current) {
      fsRef.current = new VirtualFileSystem()
      commandsRef.current = new TerminalCommands(fsRef.current)
    }
  }, [])

  // Show welcome message when terminal opens
  useEffect(() => {
    if (isOpen && history.length === 0) {
      const welcomeOutput = [
        'Welcome to Isreal\'s Portfolio Terminal',
        '',
        'Type \'help\' for available commands or \'tour\' for a guided walkthrough.',
        'Type \'gui\' to return to the graphical interface.',
        ''
      ]
      
      setHistory([{
        input: '',
        output: welcomeOutput,
        timestamp: new Date()
      }])
    }
  }, [isOpen, history.length])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleCommand = useCallback(async (command: string) => {
    if (!command.trim()) return

    // Add to command history
    setCommandHistory(prev => [...prev.filter(c => c !== command), command])
    setHistoryIndex(-1)
    setIsLoading(true)

    // Special commands
    if (command.trim() === 'gui') {
      onClose()
      return
    }

    if (command.trim() === 'clear') {
      setHistory([])
      setIsLoading(false)
      return
    }

    if (command.trim() === 'exit') {
      onClose()
      return
    }

    try {
      const result = await commandsRef.current?.executeCommand(command.trim())
      
      setHistory(prev => [...prev, {
        input: command,
        output: result?.output || ['Command completed'],
        timestamp: new Date()
      }])

      // Update current path if it changed
      if (fsRef.current) {
        setCurrentPath(fsRef.current.getCurrentPath())
      }
    } catch (error) {
      setHistory(prev => [...prev, {
        input: command,
        output: [`bash: ${command.split(' ')[0]}: command not found`],
        timestamp: new Date()
      }])
    }

    setIsLoading(false)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  const getPrompt = () => {
    const displayPath = currentPath.replace('/home/isreal', '~')
    return `user@terminal:${displayPath}$ `
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4">
      <div className={`bg-gray-900 rounded-lg shadow-2xl border border-gray-700 transition-all duration-300 ${
        isMinimized 
          ? 'w-full max-w-sm h-16' 
          : 'w-full h-full sm:h-5/6 max-w-6xl'
      }`}>
        
        {/* Terminal Header */}
        <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 text-sm font-medium">Terminal - Isreal's Portfolio</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-600 rounded text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        {!isMinimized && (
          <div className="h-full flex flex-col">
            <div 
              ref={terminalRef}
              className="flex-1 p-2 sm:p-4 bg-gray-900 font-mono text-xs sm:text-sm text-green-400 overflow-y-auto"
              style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
            >
              {/* Command History */}
              {history.map((entry, index) => (
                <div key={index} className="mb-2">
                  {entry.input && (
                    <div className="flex items-center">
                      <span className="text-green-400">{getPrompt()}</span>
                      <span className="text-white">{entry.input}</span>
                    </div>
                  )}
                  {entry.output.map((line, lineIndex) => (
                    <div key={lineIndex} className="text-gray-300 whitespace-pre-wrap">
                      {line}
                    </div>
                  ))}
                </div>
              ))}

              {/* Current Input */}
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-green-400">{getPrompt()}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white outline-none ml-1 font-mono text-xs sm:text-sm"
                  autoComplete="off"
                  spellCheck={false}
                  disabled={isLoading}
                  placeholder={isLoading ? "" : "Type a command..."}
                />
                {isLoading && (
                  <span className="text-yellow-400 animate-pulse ml-2">⏳</span>
                )}
              </form>
            </div>

            {/* Status Bar */}
            <div className="bg-gray-800 px-2 sm:px-4 py-2 border-t border-gray-700 text-xs text-gray-400 rounded-b-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="hidden sm:inline">Connected to devops-portfolio-01</span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-1 sm:gap-0">
                  <span className="truncate">Path: {currentPath.length > 20 ? '...' + currentPath.slice(-20) : currentPath}</span>
                  <span className="hidden sm:inline">Type 'help' for commands</span>
                  <span>Type 'gui' to return</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TerminalInterface