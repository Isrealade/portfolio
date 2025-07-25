import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '../Navigation'

describe('Navigation Component', () => {
  const mockTerminalToggle = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders navigation with all menu items', () => {
    render(<Navigation onTerminalToggle={mockTerminalToggle} />)
    
    // Check for main navigation items
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('displays logo', () => {
    render(<Navigation onTerminalToggle={mockTerminalToggle} />)
    
    // Logo should contain "IA" text
    expect(screen.getByText('IA')).toBeInTheDocument()
  })

  it('includes terminal toggle button', () => {
    render(<Navigation onTerminalToggle={mockTerminalToggle} />)
    
    const terminalButton = screen.getByTitle(/Try Terminal Mode/i)
    expect(terminalButton).toBeInTheDocument()
  })

  it('calls onTerminalToggle when terminal button is clicked', () => {
    render(<Navigation onTerminalToggle={mockTerminalToggle} />)
    
    const terminalButton = screen.getByTitle(/Try Terminal Mode/i)
    fireEvent.click(terminalButton)
    
    expect(mockTerminalToggle).toHaveBeenCalledTimes(1)
  })

  it('has proper accessibility attributes', () => {
    render(<Navigation onTerminalToggle={mockTerminalToggle} />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('displays mobile menu toggle on small screens', () => {
    render(<Navigation onTerminalToggle={mockTerminalToggle} />)
    
    // Mobile menu button should be present (might be hidden on desktop)
    const mobileMenuButton = document.querySelector('[aria-label="Toggle mobile menu"]')
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('terminal button has correct tooltip', () => {
    render(<Navigation onTerminalToggle={mockTerminalToggle} />)
    
    const terminalButton = screen.getByTitle(/🐧 Try Terminal Mode!/i)
    expect(terminalButton).toHaveAttribute('title', '🐧 Try Terminal Mode! Click for Linux-style CLI experience')
  })

  it('navigation links have correct href attributes', () => {
    render(<Navigation onTerminalToggle={mockTerminalToggle} />)
    
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#home')
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '#about')
    expect(screen.getByText('Skills').closest('a')).toHaveAttribute('href', '#skills')
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects')
    expect(screen.getByText('Experience').closest('a')).toHaveAttribute('href', '#experience')
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact')
  })
})