import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TerminalInterface from '../TerminalInterface'

describe('TerminalInterface Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders when open', () => {
    render(<TerminalInterface {...defaultProps} />)
    
    expect(screen.getByText(/Welcome to Isreal's Portfolio Terminal/)).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<TerminalInterface {...defaultProps} isOpen={false} />)
    
    expect(screen.queryByText(/Welcome to Isreal's Portfolio Terminal/)).not.toBeInTheDocument()
  })

  it('displays welcome message on initial load', () => {
    render(<TerminalInterface {...defaultProps} />)
    
    expect(screen.getByText(/Welcome to Isreal's Portfolio Terminal/)).toBeInTheDocument()
    expect(screen.getByText(/Type 'help' for available commands/)).toBeInTheDocument()
  })

  it('has terminal input field', () => {
    render(<TerminalInterface {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/Type a command/i)
    expect(input).toBeInTheDocument()
  })

  it('displays terminal prompt', () => {
    render(<TerminalInterface {...defaultProps} />)
    
    expect(screen.getByText(/user@terminal:~\$/)).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(<TerminalInterface {...defaultProps} />)
    
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<TerminalInterface {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/Type a command/i)
    await user.type(input, 'help')
    
    expect(input).toHaveValue('help')
  })

  it('processes help command', async () => {
    const user = userEvent.setup()
    render(<TerminalInterface {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/Type a command/i)
    await user.type(input, 'help')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(screen.getByText(/Available commands:/)).toBeInTheDocument()
    })
  })

  it('processes pwd command', async () => {
    const user = userEvent.setup()
    render(<TerminalInterface {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/Type a command/i)
    await user.type(input, 'pwd')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(screen.getByText('/home/isreal')).toBeInTheDocument()
    })
  })

  it('has minimize functionality', () => {
    render(<TerminalInterface {...defaultProps} />)
    
    const minimizeButton = document.querySelector('[class*="minimize"]') || 
                          screen.getAllByRole('button').find(btn => 
                            btn.querySelector('svg')?.getAttribute('class')?.includes('Minimize2'))
    expect(minimizeButton).toBeInTheDocument()
  })

  it('maintains command history', async () => {
    const user = userEvent.setup()
    render(<TerminalInterface {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/Type a command/i)
    
    // Execute first command
    await user.type(input, 'pwd')
    await user.keyboard('{Enter}')
    
    // Execute second command
    await user.type(input, 'ls')
    await user.keyboard('{Enter}')
    
    // Check if both commands appear in history
    await waitFor(() => {
      expect(screen.getByText('/home/isreal')).toBeInTheDocument()
    })
  })

  it('handles invalid commands gracefully', async () => {
    const user = userEvent.setup()
    render(<TerminalInterface {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/Type a command/i)
    await user.type(input, 'invalidcommand')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      expect(screen.getByText(/Command not found/i)).toBeInTheDocument()
    })
  })

  it('supports keyboard navigation for command history', async () => {
    const user = userEvent.setup()
    render(<TerminalInterface {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/Type a command/i)
    
    // Execute a command first
    await user.type(input, 'pwd')
    await user.keyboard('{Enter}')
    
    // Clear input and use arrow up to get previous command
    await user.clear(input)
    await user.keyboard('{ArrowUp}')
    
    expect(input).toHaveValue('pwd')
  })
})