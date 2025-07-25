import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TerminalHint from '../TerminalHint'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('TerminalHint Component', () => {
  const mockOnTerminalOpen = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('does not render initially', () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    expect(screen.queryByText('Try Terminal Mode!')).not.toBeInTheDocument()
  })

  it('shows hint after 3 seconds for new users', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    // Fast-forward time
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      expect(screen.getByText('Try Terminal Mode!')).toBeInTheDocument()
    })
  })

  it('does not show hint for returning users', () => {
    localStorageMock.getItem.mockReturnValue('true')
    
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(5000)
    
    expect(screen.queryByText('Try Terminal Mode!')).not.toBeInTheDocument()
  })

  it('displays hint content correctly', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      expect(screen.getByText('Try Terminal Mode!')).toBeInTheDocument()
      expect(screen.getByText(/Experience this portfolio like a real DevOps engineer/)).toBeInTheDocument()
      expect(screen.getByText('Try It Now')).toBeInTheDocument()
      expect(screen.getByText('Maybe Later')).toBeInTheDocument()
    })
  })

  it('calls onTerminalOpen when "Try It Now" is clicked', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      expect(screen.getByText('Try It Now')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('Try It Now'))
    
    expect(mockOnTerminalOpen).toHaveBeenCalledTimes(1)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('terminal-hint-seen', 'true')
  })

  it('dismisses hint when "Maybe Later" is clicked', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      expect(screen.getByText('Maybe Later')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('Maybe Later'))
    
    expect(screen.queryByText('Try Terminal Mode!')).not.toBeInTheDocument()
    expect(localStorageMock.setItem).toHaveBeenCalledWith('terminal-hint-seen', 'true')
  })

  it('dismisses hint when X button is clicked', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      expect(screen.getByText('Try Terminal Mode!')).toBeInTheDocument()
    })
    
    const closeButton = document.querySelector('button[aria-label="Close"]') ||
                       screen.getAllByRole('button').find(btn => 
                         btn.querySelector('svg')?.getAttribute('class')?.includes('X'))
    
    if (closeButton) {
      fireEvent.click(closeButton)
    }
    
    expect(screen.queryByText('Try Terminal Mode!')).not.toBeInTheDocument()
  })

  it('has proper accessibility attributes', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const hintContainer = screen.getByText('Try Terminal Mode!').closest('div')
      expect(hintContainer).toBeInTheDocument()
    })
  })

  it('has animated appearance', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const hintElement = screen.getByText('Try Terminal Mode!').closest('div')
      expect(hintElement).toHaveClass('animate-bounce')
    })
  })

  it('includes terminal icon', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const terminalIcon = document.querySelector('svg')
      expect(terminalIcon).toBeInTheDocument()
    })
  })

  it('is positioned correctly', async () => {
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const hintContainer = screen.getByText('Try Terminal Mode!').closest('div')?.parentElement
      expect(hintContainer).toHaveClass('fixed', 'bottom-4', 'right-4')
    })
  })

  it('remembers dismissal across sessions', () => {
    localStorageMock.getItem.mockReturnValue('true')
    
    render(<TerminalHint onTerminalOpen={mockOnTerminalOpen} />)
    
    // Even after waiting, should not show
    jest.advanceTimersByTime(5000)
    
    expect(screen.queryByText('Try Terminal Mode!')).not.toBeInTheDocument()
    expect(localStorageMock.getItem).toHaveBeenCalledWith('terminal-hint-seen')
  })
})